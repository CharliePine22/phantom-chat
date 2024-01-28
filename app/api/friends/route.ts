import getCurrentUser from '@/app/actions/getCurrentUser';
import getUsers from '@/app/actions/getUsers';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const allUsers = await getUsers();

  const body = await request.json(); // returns friend user object and whether its for a friend request or a friend acceptance

  // Search database for user based on submitted name and grab friend data
  const friendName: string = body.friendInfo?.name;
  const requestResults = allUsers.filter((user) => user.name == friendName);
  const friendId = requestResults[0]?.id;

  // Grab the other users friend reuqests list to see if we've already sent a friend request
  const otherUserFriendsRequestsList = requestResults[0]?.friendRequests;

  // Grab the other users friends list to see if the 2 users are already friends
  const otherUserFriendsList = requestResults[0]?.friendsList;

  if (body.method == 'ACCEPT') {
    try {
      // 1. Remove the friends id from the current users friends requests list and into the actual friends list
      const acceptFriendRequest = await prisma.user.update({
        where: {
          id: currentUser?.id,
        },
        data: {
          friendRequests: {
            set: currentUser?.friendRequests.filter(
              (request) => request !== friendId
            ),
          },
          friendsList: {
            push: friendId,
          },
        },
      });

      // 2. Add the current users id into the friends list of the requested user
      const updateOtherUser = await prisma.user.update({
        where: {
          id: friendId,
        },
        data: {
          friendsList: {
            push: currentUser?.id,
          },
        },
      });

      const updateFriendsLists = await prisma.$transaction([
        acceptFriendRequest,
        updateOtherUser,
      ]);
      return NextResponse.json(updateFriendsLists);
    } catch (error) {
      return new NextResponse('Something went wrong.', { status: 500 });
    }
  } else if(body.method == 'REJECT') {
    const rejectFriendRequest = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        friendRequests: {
          set: currentUser?.friendRequests.filter(
            (request) => request !== friendId
          ),
        }
      },
    });

    return NextResponse.json(rejectFriendRequest);
  } else {
  // Sending a Friend Request
  try {
    if (currentUser && otherUserFriendsList.includes(currentUser.id)) {
      return new NextResponse('User already on your friends list!', {
        status: 400,
      });
    }
    // Throw an error if the user has already sent a friend request to the submitted user
    else if (
      currentUser &&
      otherUserFriendsRequestsList.includes(currentUser.id)
    ) {
      return new NextResponse('Friend Request already sent!', { status: 400 });
    } else if (requestResults.length == 0) {
      return new NextResponse('No one with that username', { status: 400 });
    } else {
      const sendFriendRequest = await prisma.user.update({
        where: {
          id: friendId,
        },
        data: {
          friendRequests: {
            push: currentUser?.id,
          },
        },
      });
      return NextResponse.json(sendFriendRequest);
    }
  } catch (error) {
    return new NextResponse('Something went wrong.', { status: 500 });
  }
}
}

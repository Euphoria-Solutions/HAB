import {
  MutationPostMessageArgs,
  ResolversParentTypes,
} from '@/generated/generated';
import { MessageModel } from '@/models/message';

interface GetMessageArgs {
  id: string;
}

export const message = async (
  _: ResolversParentTypes,
  { id }: GetMessageArgs
) => {
  try {
    const message = await MessageModel.findById({ id: id });
    return message;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const postMessage = async (
  _: ResolversParentTypes,
  { user, content }: MutationPostMessageArgs
) => {
  try {
    const message = new MessageModel({
      user: user,
      content: content,
    });
    // Log the message to the console instead of using a database or PubSub
    console.log('New message posted:', message);

    await message.save();
    // Return the ID of the new message
    return message._id;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
// export const postMessage = async (
//   _: ResolversParentTypes,
//   { user, content }: MessageArgs
// ) => {
//   try {
//     const id = messages.length.toString();
//     const createdAt = new Date().toISOString();
//     const newMessage = { id, user, content, createdAt };

//     messages.push(newMessage);

//     console.log('New message posted:', newMessage);

//     return id;
//   } catch (err) {
//     throw new Error((err as Error).message);
//   }
// };

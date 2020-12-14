import { ToastAndroid } from 'react-native';
import forumService from '../services/forumService';

const initialState = {
  answered: [],
  pending: [],
  tagFilter: '',
  flagged: [],
};
const forumReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return state;
    case 'INIT_FORUM_PENDING':
      return { ...state, pending: action.data };
    case 'INIT_FORUM_ANSWERED':
      return { ...state, answered: action.data };
    case 'HEART':
      const id = action.data._id;
      const questionToChange = state.answered.find((q) => q._id === id);
      const changedQuestion = { ...questionToChange, likes: questionToChange.likes + 1 };
      return { ...state, answered: state.answered.map((q) => (q._id === id ? changedQuestion : q)) };
    case 'POST_ANSWER':
      const answerId = action.data._id;
      const objectToModify = state.pending.find((s) => s._id === answerId);
      const changedToAnswered = { ...objectToModify, isAnswered: true, answer: action.data.answer };
      return { ...state, pending: state.pending.map((s) => (s._id === answerId ? changedToAnswered : s)) };
    case 'EDIT_ANSWER':
      const editedId = action.data._id;
      const modifiedAnswer = state.answered.find((p) => p.answer._id === editedId);
      const withNewAnswer = { ...modifiedAnswer, answer: action.data };
      return { ...state, answered: state.answered.map((a) => (a.answer._id !== editedId ? a : withNewAnswer)) };
    case 'ADD_COMMENT':
      const commentedOnId = action.data._id;
      const postToChange = state.answered.find((p) => p._id === commentedOnId);
      const newPost = { ...postToChange, comments: postToChange.comments.concat(action.data.comments[action.data.comments.length - 1]) };
      return { ...state, answered: state.answered.map((s) => (s._id === commentedOnId ? newPost : s)) };
    case 'ADD_REPLY':
      const postWithCommentToEdit = state.answered.find(p => p._id === action.data.postId)
      const modifiedPost = {...postWithCommentToEdit, comments: postWithCommentToEdit.comments.filter(x => x._id !== action.data.commentObj._id).concat(action.data.commentObj)}
      return { ...state, answered: state.answered.map((s) => (s._id === action.data.postId ? modifiedPost : s)) };
    case 'DELETE_QUESTION':
      return { ...state, pending: state.pending.filter((q) => q._id !== action.data) };
    case 'DELETE_COMMENT':
      return { ...state, flagged: state.flagged.filter((c) => c._id !== action.data) };
    case 'UNFLAG_COMMENT':
      return { ...state, flagged: state.flagged.filter((c) => c._id !== action.data) };
    case 'SET_TAG_FILTER':
      return { ...state, tagFilter: action.data };
    case 'FLAG_COMMENT':
      return state;
    case 'GET_FLAGGED':
      return { ...state, flagged: action.data };
    default: return state;
  }
};
export const heart = (question) => async (dispatch) => {
  const updatedObject = { ...question, likes: question.likes + 1 };
  await forumService.heartUp(updatedObject);
  dispatch({
    type: 'HEART',
    data: updatedObject,
  });
};
export const answerQuestion = (answer) => async (dispatch) => {
  try {
    await forumService.update(answer);
    dispatch({
      type: 'POST_ANSWER',
      data: answer,
    });
    ToastAndroid.show('Question answered', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  }
};
export const editAnswer = (answer) => async (dispatch) => {
  try {
    await forumService.updateEditedAnswer(answer);
    dispatch({
      type: 'EDIT_ANSWER',
      data: answer,
    });
  } catch (error) {
    console.log(error);
  }
};
export const addComment = (comment, postToModify) => async (dispatch) => {
  try {
    await forumService.addComment(comment, postToModify).then((res) => {
      dispatch({
        type: 'ADD_COMMENT',
        data: res,
      });
    });
  } catch (error) {
    console.log(error);
    ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
  }
};
export const addReply = (reply, commentObject, postId) => async (dispatch) => {
  const id = postId
  try {
    await forumService.addReply(reply, commentObject).then((res) => {
      dispatch({
        type: 'ADD_REPLY',
        data: {commentObj: res, postId: id}
      });
    });
  } catch (error) {
    console.log(error);
    ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
  }
};
export const addQuestion = (data) => async (dispatch) => {
  try {
    const newQuestion = await forumService.create(data);
    dispatch({
      type: 'NEW_QUESTION',
      data: newQuestion,
    });
    ToastAndroid.show('ส่งคำถามแล้ว', ToastAndroid.LONG);
  } catch (error) {
    ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.LONG);
  }
};
export const deleteQuestion = (_id) => async (dispatch) => {
  await forumService.remove(_id);
  dispatch({
    type: 'DELETE_QUESTION',
    data: _id,
  });
  ToastAndroid.show('Question deleted', ToastAndroid.SHORT);
};
export const deleteComment = (_id) => async (dispatch) => {
  await forumService.removeComment(_id);
  dispatch({
    type: 'DELETE_COMMENT',
    data: _id,
  });
};
export const removeCommentFlag = (_id) => async (dispatch) => {
  await forumService.unflag(_id);
  dispatch({
    type: 'UNFLAG_COMMENT',
    data: _id,
  });
};
export const initializeForumPending = () => async (dispatch) => {
  const questions = await forumService.getPending();
  dispatch({
    type: 'INIT_FORUM_PENDING',
    data: questions,
  });
};
export const getFlaggedComments = () => async (dispatch) => {
  const flagged = await forumService.getFlagged();
  dispatch({
    type: 'GET_FLAGGED',
    data: flagged,
  });
};
export const initializeForumAnswered = () => async (dispatch) => {
  const answered = await forumService.getAnswered();
  dispatch({
    type: 'INIT_FORUM_ANSWERED',
    data: answered,
  });
};
export const setTagFilter = (tag) => ({
  type: 'SET_TAG_FILTER',
  data: tag,
});
export const setFlaggedComment = (comment) => async (dispatch) => {
  const flaggedPost = await forumService.flagComment(comment);
  dispatch({
    type: 'FLAG_COMMENT',
    data: flaggedPost,
  });
  ToastAndroid.show('ขอบคุณที่ช่วยรายงานปัญหาให้แอดมินทราบค่ะ', ToastAndroid.SHORT);
};

export default forumReducer;

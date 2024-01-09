// component css styles
import styles from "./ReactionButtons.module.css";

// redux stuff
import { useDispatch } from "react-redux";

// posts logic & slice
import { reactionAdded } from "../postsSlice";

// Available emoji options
const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export default function ReactionButtons({ post }) {
  // Global state & dispatch coming from redux
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}>
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className={styles["reaction-buttons"]}>{reactionButtons}</div>;
}

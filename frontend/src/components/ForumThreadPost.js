import TextEditor from "./TextEditor";
import RoleBadge from "./RoleBadge";
import Input from "./Input";
import * as ForumService from "services/ForumService";
import { Link } from "react-router-dom";
import { useUserStore } from "store/UserStore";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ThreadPost(props) {
  const [post, setPost] = useState();
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [errors, setErrors] = useState([]);
  const { user, IsModerator } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    setPost(props.data);
  }, []);
  
  const SubmitEdit = () => {
    if (editInput.length < 16) {
      setErrors(["Text of the post must be atleast 16 characters long."]);
      return;
    }

    ForumService.EditPost(post._id, { text: editInput }, (editedPost) => {
      setPost(editedPost);
      setIsBeingEdited(false);
    }, (errors) => {
      setErrors(errors);
    });
  };

  const DeletePost = () => {
    ForumService.DeletePost(post._id, () => {
      navigate(0);
    });
  }

  const StartEdit = () => {
    setIsBeingEdited(true);
    setEditInput(post.text);
  }

  return (
    <>
      { post ? isBeingEdited ? 
      <>
        <TextEditor value={editInput} onChange={setEditInput} />
        { errors && errors.length > 0 ?
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {errors.map((error, i) => (
              <span key={i} className="block sm:inline">{error}<br /></span>
            ))}
          </div>
        : <></>}
        <div className="flex flex-row justify-around">
          <Input type="submit" onClick={() => setIsBeingEdited(false)} value="Cancel" className="bg-gray-900 text-white border-e-2 rounded-t-none rounded-br-none rounded-tr" />
          <Input type="submit" onClick={SubmitEdit} value="Save" className="bg-gray-900 text-white border-s-2 rounded-t-none rounded-bl-none rounded-tl" />  
        </div> 
      </>
      :
      <div className="flex flex-row p-4 hover:bg-gray-200 hover:rounded">
        <Link to="#" className="w-2/12 flex flex-col items-center text-center border-r">
          <span className="text-gray-900 font-bold mb-1">{post.author.username}</span>
          <img className="rounded" src="/avatar2.png" width={96} height={96} alt="Avatar" />
          <RoleBadge role={post.author.role} />
        </Link>
        <div className="flex flex-col w-10/12">
          <div className="ql-container ql-snow !border-0">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.text }}>
            </div>
          </div>
          <div className="self-end text-gray-900 me-4 text-xl cursor-pointer">
            { !props.excludeDelete &&
              <>
                { (user.id == post.author._id || IsModerator()) && 
                  <FontAwesomeIcon onClick={DeletePost} icon={faTrash} />
                }
              </>
            }
            { user.id == post.author._id && <FontAwesomeIcon onClick={StartEdit} className="ms-3" icon={faPencil} /> }
          </div>
        </div>
      </div>
      : <></>}
    </>
  );
}
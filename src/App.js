import { Queries } from "./useRequest";
import Post from "./components/Post";
import { useState } from "react";
import Header from "./components/Header";
import { useQueries, useQuery } from "react-query";

export default function App() {
  const [postId, setPostId] = useState(" ");

  const {fetchPostList,fetchOnePost} = Queries
  
  const {data: totalPost,error,isLoading, isSuccess} = useQuery({
    queryKey : "get-posts",
    queryFn : (options)=>fetchPostList(options),
  });

  const {data: selPost} = useQuery({
    queryKey: "get-post",
    queryFn: (postId)=>fetchOnePost(postId),
    enabled: !!totalPost
  });

  const handleOnePost = () => {
    selPost()
  }

  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if(isSuccess){
    console.log()
    return (
      <div className="App">
        <Header />
        <input type="text" value={postId} onChange={(e)=> setPostId(e.target.value)}></input>
        <button onClick={()=>handleOnePost()}>useQuery get one by id</button>
        { totalPost.items.map((post)=><Post key={post._id} article={post} />)}
        { isSuccess && totalPost &&
          console.log(selPost)
          // totalData.items.map((post)=><Post article={post} />)
        }
      </div>
    );
  }

}
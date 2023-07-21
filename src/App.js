import { Queries } from "./useRequest";
import Post from "./components/Post";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { useMutation, useQueries, useQuery } from "react-query";

export default function App() {
  // const [options,setOptions]= useState({
    // "options":{
    //   "paginate": {
    //     "page": 1,
    //     "limit": 5
    //   }
    // }
  // });
//  
// Alexander
  const [id,setID]=useState("");
  const [filter,setFilter]=useState({});
  const [projectID,setProjectID]=useState("");
  const [files,]=useState([]);

  const [totalContinentData,setTotalContinentData]=useState();

  const {getCharacters,filterContinents} = Queries
  const {data: totalCharacters,error,isLoading,isSuccess,refetch} = useQuery({
    queryKey: ["characters",id],
    queryFn: (id) => getCharacters(id),
    // {
    //   enabled: !!id,
    // }
    refetchOnWindowFocus: false,
    retry: 0, // 자동적으로 데이터를 재요청하는 것을 조절하는 파라미터
  });

  const {data:filteredData} = useQuery({
    queryKey:["Continents",filter],
    queryFn:(filter)=>filterContinents(filter),
    refetchOnWindowFocus: false,
    retry: 0, 
    keepPreviousData:true//새로 fetch한 데이터가 화면에 나타나기 전까지 기존 데이터를 노출
  })

  // const {data:} = useQuery({
  //   queryKey: [],
  //   queryFn:()=>{},
  //   refetchOnWindowFocus: false,
  //   retry: 0, 
  // })

  //! mutations후 다시 data를 get
  // const mutation = useMutation(editTodo, {

  // onSuccess: () => {
  //   postTodo가 성공하면 todos로 맵핑된 useQuery api 함수를 실행합니다.
  //   queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   queryClient.invalidateQueries({ queryKey: ['reminders'] })
  // }

  // onSuccess: data => {
  //     data가 fetchTodoById로 들어간다
  //     queryClient.setQueryData(["todo", { id: 5 }], data);
  //   }
  // });

  useEffect(()=>
    console.log(filter)
  ,[filter]);

  // "code":{"in":["AF","AS"]}
  const handleContinents = (selectedCode) => {
    filter.code
      ?setFilter(prev => {
        return {"code":{"in":[...prev.code.in,selectedCode]}}
      })
      :setFilter({"code":{"in":[selectedCode]}})
  }

  // const {data: selPost} = useQuery({
  //   queryKey: "get-post",
  //   queryFn: (postId)=>fetchOnePost(postId),
  //   enabled: !!totalCharacters,
  //   refetchOnWindowFocus: false,
  //   retry: 0,
  // });

  // const updateUser = useMutation({
  //   mutationKey: newUserId,
  //   mutationFn : (newUserID) => updateUserID(newUserID),
  //   onSuccess: () => selPost,
  // })

  const handleOnePost = () => {
    refetch() // 사용자가 의도적으로 data를 재요청하도록 하는 속성
  };

  if(isSuccess){
    // console.log(totalCharacters.characters.results[0]) // data 출력되는 부분 queryKey의 첫번째 요소로 반환된다.
  }
  
  useEffect(()=>{
    if(filteredData&&!totalContinentData){
      console.log(filteredData.continents);
      setTotalContinentData( filteredData.continents.map(continents => continents.code));
    } // set
    filteredData&&console.log(filteredData);
  },[filteredData]);

  return (
    <div className="App">
      <Header />
      <input type="text" value={id} onChange={(e)=> setID(e.target.value)}></input>
      <button onClick={()=>handleOnePost()}>useQuery get one by id</button>
      {filter.code&&<span>{filter.code.in.toString()}</span>}
      {
        totalContinentData&& 
          totalContinentData.map( code =>
            <div key={code}>
              <p>{code}</p>
              <input type="checkbox" value={code} onChange={(e)=>handleContinents(e.target.value)} />
            </div>
          )
      }

      {/* { totalPost.items.map((post)=><Post key={post._id} article={post} />)}
      { isSuccess && totalPost &&
        console.log(selPost)
        // totalData.items.map((post)=><Post article={post} />)
      } */}
    </div>
  );

}
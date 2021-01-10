import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { CurrentPostComponent } from "../../Csr/nextComponents/currentPost";
import MainLayout from "../../Csr/mainLayout";
import { mainDataSlice } from "../../Redux/actions/(_a-_r)_main_data";
const { mainDataSuccess } = mainDataSlice.actions;

export default function Posts() {
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  const main_data = useSelector((state) => state.main_data);

  console.log(main_data, " store Data");

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "https://next-app-city.herokuapp.com/api/tv"
        );

        const data = await response.json();
        let i = 0;
        let sorted = [];
        while (i < 30) {
          sorted.push(data[i]);
          i++;
        }

        // dispatch(mainDataSuccess(sorted))
        console.log(sorted, " data from Posts");
      } catch (err) {
        console.log("###### Error Handler", err);
        throw err;
      }
    }
    load();

    return () => {
      console.log("Component Post Unmounted");
    };
  }, []);

  const handleClick = (e) => {
    console.log("Click Handled => ", e.currentTarget);
  };

  return (
    <MainLayout title="Posts ">
      <h1>Posts Main Page</h1>
      {main_data.length ? (
        <ul className="posts_list">
          {main_data.map((post, index) => {
            return (
              <li key={index} className="posts_list_item" value={post}>
                <CurrentPostComponent data={post} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no_posts_data">No Posts</div>
      )}
    </MainLayout>
  );
}

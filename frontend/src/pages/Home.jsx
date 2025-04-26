import { useState } from "react";
import Search from "../components/Search";
import BoardView from "../views/BoardView";
import GridView from "../views/GridView";
import { MdAddCircleOutline } from "react-icons/md";
import { BsGrid3X2GapFill } from "react-icons/bs";
import { CiViewBoard } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ListView from "../views/ListView";

function Home() {
  const [view, setView] = useState(3);

  const navigate = useNavigate();

  return (
    <div className="m-2">
      <Search />
      <div className="flex gap-5 md:gap-0 justify-between my-4 mx-5">
        <button
          className="flex justify-center items-center gap-1 bg-blue-500 text-white font-semibold p-2 rounded-md"
          onClick={() => navigate("/addtask")}
        >
          <MdAddCircleOutline size={20} />
          <span className="hidden md:block">Add Task</span>
        </button>
        <div className="flex gap-2">
          {view !== 1 && (
            <button
              className="flex justify-center items-center gap-1 bg-purple-500 rounded-md py-2 px-3 text-white font-semibold"
              onClick={() => setView(1)}
            >
              <BsGrid3X2GapFill size={20} />
              <span className="hidden md:block">Grid</span>
            </button>
          )}
          {view !== 2 && (
            <button
              className="flex justify-center items-center gap-1 bg-purple-500 rounded-md py-2 px-3 text-white font-semibold"
              onClick={() => setView(2)}
            >
              <CiViewBoard size={20} />
              <span className="hidden md:block">Board</span>
            </button>
          )}
          {view !== 3 && (
            <button
              className="flex justify-center items-center gap-1 bg-purple-500 rounded-md py-2 px-3 text-white font-semibold"
              onClick={() => setView(3)}
            >
              <FaListUl size={20} />
              <span className="hidden md:block">List</span>
            </button>
          )}
        </div>
      </div>
      {view === 1 && <GridView />}
      {view === 2 && <BoardView />}
      {view === 3 && <ListView />}
    </div>
  );
}

export default Home;

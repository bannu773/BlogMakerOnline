import { Route, Routes } from "react-router-dom"
import ResponsiveAppBar from "./components/Navbar/Navbar"
import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"
import Topic from "./components/topic/Topic"
import BlogMaker from "./components/blogmaker/BlogMaker"

const App = () => {
  return (
    <>
      {/* <Sidebar /> */}
      <ResponsiveAppBar />
      <Routes>
        
        <Route path="/" element={<Topic />} />
        <Route path="/blogpost" element={<BlogMaker />} />
      </Routes>
      
      {/* <Main /> */}
    </>
  )
}

export default App
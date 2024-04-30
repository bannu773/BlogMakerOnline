import ResponsiveAppBar from "./components/Navbar/Navbar"
import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"
import Topic from "./components/topic/Topic"

const App = () => {
  return (
    <>
      {/* <Sidebar /> */}
      <ResponsiveAppBar />
      <Topic />
      
      {/* <Main /> */}
    </>
  )
}

export default App
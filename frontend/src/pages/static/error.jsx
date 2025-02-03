import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <div className="flex flex-col items-left justify-center min-h-screen -mt-32 ml-40">
        <div className="font-bold text-5xl">404 Not Found</div>
        <div>Your visited page not found. You may go home page.</div>
        <span><button className="bg-orange-500 rounded text-white p-1 m-1"><Link to="/">Back to home page</Link></button></span>
    </div>
  )
}

export default Error
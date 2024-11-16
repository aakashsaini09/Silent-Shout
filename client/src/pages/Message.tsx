import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";

const Message = () => {
    let { id } = useParams()
    const BackEndURL = import.meta.env.VITE_APP_BACKEND_URL
    const {toast} = useToast()
    const [loading, setloading] = useState(false)
    const [title, settitle] = useState('')
    const sendMessage = async () => {
        setloading(true)
        try {  
            await axios.post(`${BackEndURL}/api/auth/user/addfeed/${id}`, {title: title})
            toast({description: "Message Send Successfully" })
            setloading(false)
            settitle("")
        } catch (error) {
            settitle("")
            toast({variant: 'destructive', description: "Error Occure! Please try again" })
            console.log("Something went wrong. Error: ", error)
            setloading(false)
        }
    }
  return (
  <>
    {loading && <div className="min-h-[100vh] min-w-[100vw] absolute z-10 bg-gray-900 text-white"><Loading/></div>}
    <div className="min-h-[90vh] max-w-[100vw] bg-black overflow-hidden">
        <div className="w-full min-h-[40vh] flex justify-center items-center">
            <Input className="w-[30vw] outline-none mr-3 text-white py-7 px-4 text-5xl" value={title} onChange={(e)=> {settitle(e.target.value)}} type="text" placeholder="Enter Message" />
            <Button className="bg-purple-600 hover:bg-purple-700 py-7 px-4" type="submit" onClick={sendMessage}>Send Message</Button>
        </div>
        <div className="w-full ">
            <h1 className="text-center font-mono text-3xl font-bold text-white">Your Identity will be hidden. <br />But Please be polite.</h1>
        </div>
    </div>
    <div className="w-full bg-black flex justify-center h-[10vh]">
        <Link className="font-semibold text-lg text-white" to={'/login'}>Would You Like to join this platform <i className="fa-solid fa-heart ml-1 text-base text-red-600"></i></Link>
    </div>
  </>
  )
}

export default Message

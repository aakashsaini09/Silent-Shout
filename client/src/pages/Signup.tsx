import { useToast } from "@/hooks/use-toast"
import { UserEmail, UserName } from "@/store/user"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import Loading from "@/components/Loading"

const Signup = () => {
  const BackEndURL = import.meta.env.VITE_APP_BACKEND_URL
  const navigate = useNavigate()
  const {toast} = useToast()
  // @ts-ignore
      const [recoilUser, setRecoilUser] = useRecoilState(UserName)
      // @ts-ignore
      const [recoilEmail, setRecoilEmail] = useRecoilState(UserEmail)
      const [loading, setloading] = useState(false)
  const [userData, setuserData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const signupFunction = async(e: any) => {
    e.preventDefault()
    setloading(true)
    try {    
        const res = await axios.post(`${BackEndURL}/api/auth/user/signup`, {name: userData.name, email: userData.email, password: userData.password})
        if (res.data.success) {
            const jwt = res.data.token;
            localStorage.setItem("token", jwt)
            localStorage.setItem("id", res.data.user.id)
            setRecoilUser(userData.name)
            setRecoilEmail(userData.email)
            navigate('/feedback');
            setuserData({
              name: '',
              email: '',
              password: ''
            })
            setloading(false)
          } else {
            console.log("res.data is: ", res)
            toast({ variant: 'destructive', description: res.data.message });
            setloading(false)
          }
        } catch (err) {
          console.log(err)
          toast({ variant: 'destructive', description: "User Already Exist"});
          setuserData({
            name: "",
            password: "",
            email: ""
          })
        setloading(false)

    }
  }
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <div className='h-[100vh]'>
    <header className="fixed top-0 w-full clearNav z-50">
    <div className="max-w-6xl mx-auto flex p-5">
      <div className="">
        <a href="/"className="flex text-3xl text-white font-extrabold mb-4 md:mb-0">SILENT SHOUT </a>
        <button className="text-white pb-4 cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none content-end ml-auto" type="button" aria-label="button" onClick={() => setNavbarOpen(!navbarOpen)} >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </header>
    {loading && <div className="min-h-[100vh] min-w-[100vw] absolute z-10 bg-gray-900 text-white"><Loading/></div>}
     
      <section className="flex h-full justify-center items-center">
        <div
          className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an
              account
            </h1>
            <form className="space-y-4 md:space-y-6" method="POST">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                <input value={userData.name} onChange={(e) => setuserData({...userData, name: e.target.value})} type="text" name="name" id="name" className="bg-zinc-900 py-3 text-gray-900 sm:text-sm rounded-lg border-none outline-none block w-full p-2.5 dark:bg-zinc-900 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required/>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Email</label>
                <input value={userData.email} onChange={(e) => setuserData({...userData, email: e.target.value})} type="email" name="email" id="email" className="bg-gray-50 py-3 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-zinc-900 border-none outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Johndoe@gmail.com" required/>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input value={userData.password} onChange={(e) => setuserData({...userData, password: e.target.value})} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 py-3 border-none outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-zinc-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              </div>
              <button disabled={loading} onClick={signupFunction} type="submit" className={`w-full focus:ring-4 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading ? 'cursor-not-allowed bg-purple-400' : 'bg-purple-600 cursor-pointer hover:bg-purple-700'}`}>Create an account</button>
              <Link to='/login' className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <a
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/signin">Sign in here</a>
              </Link>
            </form>
          </div>
        </div>
</section>
    </div>
  )
}

export default Signup

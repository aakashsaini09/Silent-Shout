import Loading from '@/components/Loading'
import landing from '../assets/landing1.jpg'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '@/components/Footer'
const Landing = () => {
  const {toast} = useToast()
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [loading, setloading] = useState(true)
  const url = 'https://silent-shout.netlify.com';
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast({description: "Link copied!"})
  };
  const [title, settitle] = useState('')
  const BackEndURL = import.meta.env.VITE_APP_BACKEND_URL
  const sendMessage = async (e: any) => {
    e.preventDefault()
    let id = "14"
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
  useEffect(() => {
    // getAllusers()
    getContributors()
  }, [])
  const [star, setstar] = useState(0)
  const getContributors = async() => {
    setloading(true)
    const res = await axios.get('https://api.github.com/repositories/670952279')
    setstar(res.data.stargazers_count)
    setloading(false)
}
// https://silent-shout.netlify.appmessage/672efbcc32518b1efa8e28d5
  return (
    <>
    {loading && <div className="h-[100vh] w-full overflow-y-hidden absolute z-10 bg-gray-900 text-white"><Loading/></div>}
    <header className="fixed top-0 w-full clearNav z-50">
      <div className="max-w-6xl mx-auto flex justify-between p-5 ">
        <div className="">
          <a href="/"className="flex text-3xl text-white font-extrabold mb-4 md:mb-0" >SILENT SHOUT </a>
          <button className="text-white pb-4 cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none content-end ml-auto" type="button" aria-label="button" onClick={() => setNavbarOpen(!navbarOpen)} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>


        <div className="">
          <Link to={'https://github.com/aakashsaini09/Silent-Shout.git'} target='_blank' className="flex overflow-hidden border items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2">
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" ></span>
            <div className="flex items-center">
            <i className="fa-brands fa-github text-white mr-2 text-lg"></i> 
              <span className=" text-white">Star on GitHub</span>
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <svg className="w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path clipRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" fillRule="evenodd"></path>
              </svg>
              <span className="inline-block tabular-nums tracking-wider font-display font-medium text-white">{star}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
    <section className="text-gray-600 body-font">
        <div className="max-w-5xl pt-52 pb-24 mx-auto">
          <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          Invite Honest Thoughts, No Names Attached
          </h1>
          <h2 className="text-2xl font-4 font-semibold px-28 pb-11 text-gray-700 text-center">
          Share your unique link to receive honest, anonymous feedback from friends and followers. No sign-ups, no identities — just real opinions.
          </h2>
          <div className="ml-6 text-center">
            <span
              className="inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline" >
              <div className="flex text-lg">
                <span onClick={copyLinkToClipboard} className="justify-center cursor-pointer">Invite Your Friends</span>
              </div>
      
            </span>
            <div className="inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent ml-11 bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline">
              <div className="flex text-lg">
                <Link to={'/login'} className="justify-center">Get Start For Free</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center mx-auto">
          <img src={landing} className="object-cover object-center w-3/4 mb-10 shadow-md filter grayscale" alt="Placeholder Image"></img>
        </div>
        <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter font-serif text-center text-gray-200 lg:text-7xl md:text-6xl">
          Silent Shout
        </h2>
        <br></br>
        <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
          Best platform to share your thoughts for particular person for free.
        </p>
        <div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
          <div className="ktq4">
            <h3 className="pt-3 font-semibold text-lg text-white">
                <i className="fa-solid fa-shield-halved mr-3"></i>Security & Privacy
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Your identity is safe with us. Messages are fully anonymous, and no personal data is shared. Feel confident in your privacy.
            </p>
          </div>
          <div className="ktq4">
            <h3 className="pt-3 font-semibold text-lg text-white">
                <i className="fa-regular fa-heart mr-3"></i>Respectful Feedback Only
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Our platform is built for honest, constructive feedback—harassment and harmful language have no place here.
            </p>
          </div>
          <div className="ktq4">
            <h3 className="pt-3 font-semibold text-lg text-white">
                <i className="fa-solid fa-share mr-3"></i>Effortless Sharing
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Share your link on social media or directly with friends. No sign-ups required for message senders, making it easy for everyone to connect.
            </p>
          </div>
          <div className="ktq4">
            <h3 className="pt-3 font-semibold text-lg text-white">
                <i className="fa-regular fa-face-smile mr-3"></i>Simple & Insightful
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            View all your feedback in one place. Log in anytime to see what others have to say and gain real insights.
            </p>
          </div>
        </div>


        {/* <div className="pt-32 pb-32 max-w-6xl mx-auto fsac4 md:px-1 px-3">
          <div className="ktq4">
            <img src="https://nine4.app/images/nine4-3.png"></img>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Fusce pharetra ligula mauris, quis faucibus lectus elementum vel.
              Nullam vehicula, libero at euismod tristique, neque ligula faucibus
              urna, quis ultricies massa enim in nunc. Vivamus ultricies, quam ut
              rutrum blandit, turpis massa ornare velit, in sodales tellus ex nec
              odio.
            </p>
          </div>
          <div className="ktq4">
            <img src="https://nine4.app/images/nine4-3.png"></img>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Fusce pharetra ligula mauris, quis faucibus lectus elementum vel.
              Nullam vehicula, libero at euismod tristique, neque ligula faucibus
              urna, quis ultricies massa enim in nunc. Vivamus ultricies, quam ut
              rutrum blandit, turpis massa ornare velit, in sodales tellus ex nec
              odio.
            </p>
          </div>
        </div> */}
        <section className="relative pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="py-24 md:py-36">
              <h1 className="mb-5 text-6xl font-bold text-white">
                Have Something in Mind?
              </h1>
              <h1 className="mb-9 text-2xl font-semibold text-gray-200">
                Have Feedback? Share It Anonymously! Directly with Me!
              </h1>
              <input value={title} onChange={(e)=>{settitle(e.target.value)}} type="text" placeholder='This website is...' name="email" autoComplete="email" className="border border-gray-600 w-1/4 py-4 px-3 rounded-md text-white font-semibold hover:border-gray-700 bg-black"/>
              <div className="inline-flex items-center px-7 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white">
                <button type='submit' className="justify-center" onClick={sendMessage}>Send Feedback</button>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer/>
    </>
  )
}

export default Landing

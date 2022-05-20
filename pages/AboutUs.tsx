import Image from 'next/image'
import eddie from '../public/eddie.jpg'
import edris from '../public/edris.jpg'
import osborn from '../public/osborn.jpg'
import taylor from '../public/taylor.jpg'
import isaiah from '../public/isaiah.jpg'

export default function AboutUs() {
  return (
    <main className='bg-neutral-200'>
      <div className='text-center'>
        <h1 className='pt-10 mb-10 text-6xl font-bold'>About Us</h1>
        <h3 className='text-2xl font-semibold'>Dudes of Color</h3>
        <p>Group of diverse Software Developers striving to better ourselves everyday</p>
      </div>
      <h2 className='my-10 text-6xl font-semibold text-center'>Meet Our Team</h2>
      
      <section className='flex flex-row justify-center m-5'>
        <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
          <div className='flex justify-center'>
          <Image src={eddie} width={200} height={200} />
          </div>
          <div className=''>
            <h2>Eddie Ponce</h2>
            <p>Front End Dev!!!</p>
            <p className='text-justify'>Hello, my name is Eddie Ponce, and I am a Full Stack Software Developer based out of Vancouver, WA. I am also a USMC Veteran who served five years on Active-Duty orders as a Ground Intelligence Analyst and later became a Regimental Intelligence Chief. During my honorable service I received multiple awards and certifications in both CONUS and O-CONUS operations. I chose to get into Software Development because of the problem solving/critical-thinking aspect of the job, similar to my past duties as an Analyst. I write code just about every day and enjoy learning about newly released technology on my spare time! Though I am happiest with front-end development, I've recently grown a huge interest in back-end development too! My ultimate goal is to make a positive impact in my next workspace and to continuously challenge my limits as a Software Developer.</p>
            <p>linkedin.com/in/eddie-ponce/</p>
            <p>github.com/ponceedi000</p>
          </div>
        </div>
          
          <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
            <div className='flex justify-center'>
            <Image src={isaiah} width={200} height={200} />
            </div>
            <div className=''>
              <h2>Isaiah Burkes</h2>
              <p>Front End Dev!!!</p>
              <p className='text-justify'>I am a software engineer with great enthusiasm for learning how to create scalable, fault tolerant, highly available, and maintainable software. I learn new skills quickly and have experience working on many teams.
              Interests in distributed systems, cloud computing, solving hard problems. and delivering high quality solutions that drive business impact.</p>
              <p>linkedin.com/in/isaiah-burkes/</p>
              <p>github.com/idkburkes</p>
            </div>
          </div>
          <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
            <div className='flex justify-center'>
            <Image src={taylor} width={200} height={200} />
            </div>
            <div className=''>
              <h2>Taylor White</h2>
              <p>Software Developer</p>
              <p className='text-justify'>Hiya! My name is Taylor White and I am a Software developer and aspiring indie game developer with a background in IT and military service. My goal with getting into software development is to open my own non-profit that will teach under-privileged children basic computer skills, programming, and game development to give them invaluable skills in this ever-growing world of technology.</p>
              <p>linkedin.com/in/taylorwhite21/</p>
              <p>github.com/TaylorWhite21</p>
              <p><button>Contact</button></p>
            </div>
          </div>
          <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
            <div className='flex justify-center'>
            <Image src={osborn} width={200} height={200} />
            </div>
            <div className=''>
              <h2>Osborn Del Angel</h2>
              <p>Software Developer</p>
              <p className='text-justify'>Hello, my Name is Osborn Del Angel I'm a Software Developer with a background in freight. During my time as an Operation Assistant I learned the importance in teamwork, accountability, and bringing a viable product straight to consumer. These are all things I feel that I bring to the table as a Software Developer. I have a passion for American Made products, and one of the things we do very well as a country is make technology, that is something that I want to contribute to in the future and that is what brings me here today. In the future I hope to become a front end developer and to work for a company that I truly believe in and I hope to work in an environment that wants me to grow professionally.</p>
              <p>linkedin.com/in/osborndelangel</p>
              <p>github.com/Ozdelangel</p>
            </div>
          </div>
        <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
          <div className='flex justify-center'>
          <Image src={edris} width={200} height={200} />
          </div>
          <div className=''>
            <h2>Edris Berg</h2>
            <p>Software Developer</p>
            <p className='text-justify'>Aspiring web developer studying Full-Stack development in Python. Things might look messy. Just learning to code how all the different things fit together.</p>
            <p>linkedin.com/in/berged/</p>
            <p>github.com/Fadab2</p>
          </div>
        </div>
      </section>
    </main>
  )
}

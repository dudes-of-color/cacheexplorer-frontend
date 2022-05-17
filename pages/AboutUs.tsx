import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import eddie from '../public/eddie.jpg'
export default function AboutUs() {
  return (
    <>
      <Header />
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
              <p>jane@example.com</p>
              <p><button>Contact</button></p>
            </div>
          </div>
          <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
            <div className='flex justify-center'>
            <Image src={eddie} width={200} height={200} />
            </div>
            <div className=''>
              <h2>Taylor White</h2>
              <p>Front End Dev!!!</p>
              <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat. Mollis nunc sed id semper risus. Morbi tristique senectus et netus et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Ultrices dui sapien eget mi proin sed. Eget aliquet nibh praesent tristique magna. In est ante in nibh mauris cursus mattis. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Augue ut lectus arcu bibendum at varius vel. Venenatis lectus magna fringilla urna. Cursus euismod quis viverra nibh cras. Mattis ullamcorper velit sed ullamcorper. Risus at ultrices mi tempus imperdiet. At tellus at urna condimentum mattis. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Eget egestas purus viverra accumsan in nisl nisi. Fermentum odio eu feugiat pretium nibh ipsum consequat.</p>
              <p>jane@example.com</p>
              <p><button>Contact</button></p>
            </div>
          </div>
          <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
            <div className='flex justify-center'>
            <Image src={eddie} width={200} height={200} />
            </div>
            <div className=''>
              <h2>Isaiah Burkes</h2>
              <p>Front End Dev!!!</p>
              <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat. Mollis nunc sed id semper risus. Morbi tristique senectus et netus et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Ultrices dui sapien eget mi proin sed. Eget aliquet nibh praesent tristique magna. In est ante in nibh mauris cursus mattis. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Augue ut lectus arcu bibendum at varius vel. Venenatis lectus magna fringilla urna. Cursus euismod quis viverra nibh cras. Mattis ullamcorper velit sed ullamcorper. Risus at ultrices mi tempus imperdiet. At tellus at urna condimentum mattis. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Eget egestas purus viverra accumsan in nisl nisi. Fermentum odio eu feugiat pretium nibh ipsum consequat.</p>
              <p>jane@example.com</p>
              <p><button>Contact</button></p>
            </div>
          </div>
          <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
            <div className='flex justify-center'>
            <Image src={eddie} width={200} height={200} />
            </div>
            <div className=''>
              <h2>Osborn DelAngel</h2>
              <p>Front End Dev!!!</p>
              <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat. Mollis nunc sed id semper risus. Morbi tristique senectus et netus et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Ultrices dui sapien eget mi proin sed. Eget aliquet nibh praesent tristique magna. In est ante in nibh mauris cursus mattis. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Augue ut lectus arcu bibendum at varius vel. Venenatis lectus magna fringilla urna. Cursus euismod quis viverra nibh cras. Mattis ullamcorper velit sed ullamcorper. Risus at ultrices mi tempus imperdiet. At tellus at urna condimentum mattis. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Eget egestas purus viverra accumsan in nisl nisi. Fermentum odio eu feugiat pretium nibh ipsum consequat.</p>
              <p>jane@example.com</p>
              <p><button>Contact</button></p>
            </div>
          </div>
          <div className='p-10 mx-5 border rounded-lg bg-slate-100'>
            <div className='flex justify-center'>
            <Image src={eddie} width={200} height={200} />
            </div>
            <div className=''>
              <h2>Edris Berg</h2>
              <p>Front End Dev!!!</p>
              <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec et odio pellentesque diam volutpat. Mollis nunc sed id semper risus. Morbi tristique senectus et netus et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Ultrices dui sapien eget mi proin sed. Eget aliquet nibh praesent tristique magna. In est ante in nibh mauris cursus mattis. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Augue ut lectus arcu bibendum at varius vel. Venenatis lectus magna fringilla urna. Cursus euismod quis viverra nibh cras. Mattis ullamcorper velit sed ullamcorper. Risus at ultrices mi tempus imperdiet. At tellus at urna condimentum mattis. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Eget egestas purus viverra accumsan in nisl nisi. Fermentum odio eu feugiat pretium nibh ipsum consequat..</p>
              <p>jane@example.com</p>
              <p><button>Contact</button></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
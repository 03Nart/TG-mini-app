import Maincomponent from './(components)/maincomponent';

export default function Home() {
  return (
    <div className="flex w-full p-6 h-screen bg-gradient-to-b from-gray-900 to-black flex-col overflow-x-hidden overflow-y-scroll space-y-6">
      {/* <p className="text-5xl font-thin text-center mt-5 text-white dark:text-white underline">Just Look.</p> */}
      
      <Maincomponent className='' name='Blum airdrop' image='/images/download.png' link='id' />
      <Maincomponent className='' name='test' image='/images/download.png' link='id' />
      <Maincomponent className='' name='test' image='/images/download.png' link='id'/>
      <Maincomponent className='' name='test' image='/images/download.png' link='id'/>
      <Maincomponent className='' name='test' image='/images/download.png'  link='id'/>
     
    </div>
  );
}

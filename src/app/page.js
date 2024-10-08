import Maincomponent from './(components)/maincomponent';
async function getData(){
  const res = await fetch("https://d.lazaristcatholicschool.org/items", { cache:'no-store' })
  const data = await res.json()
  // console.log(data)
  return data
}
export default async  function  Home() {
  const poo = await getData()
  return (
    <div className="flex w-full p-6 h-screen bg-gradient-to-b from-gray-900 to-black flex-col overflow-x-hidden overflow-y-scroll space-y-6">
       {poo.map((each) => (
      <Maincomponent className='' name={each.name} image={`https://d.lazaristcatholicschool.org${each.image}`} link={each.id} />
                    
                  ))}
      
     
    </div>
  );
}

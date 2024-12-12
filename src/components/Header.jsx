import React from 'react'

function Header() {
  return (
    <div className='flex justify-around items-center mt-5'>
        <div>
            <h2 className='text-2xl font-bold text-[#87CEEB]'>CRYPTOFOLIO</h2>
        </div>
        <div className='flex gap-5'>
            <select className='bg-transparent text-white' name="" id="">
                <option value="">USD</option>
                <option value="">UZB</option>
                <option value="">EURO</option>
            </select>
            <button className='bg-[#87CEEB] py-2 px-5 font-medium rounded-md'>WATCH LIST</button>
        </div>
    </div>
  )
}

export default Header
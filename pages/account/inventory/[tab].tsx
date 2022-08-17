import styles from './index.module.scss';
import cn from 'classnames';
import GoldyCard from 'components/cards/GoldyCard';
import { useRouter } from 'next/router';
import PetCard from 'components/cards/PetCard';
import GoldyPassCard from 'components/cards/GoldyPassCard';
import GoldyPotCard from 'components/cards/GoldyPotCard';
import { Component, useEffect, useState } from 'react';
import AccountLayout from 'components/layout/Account';
import { inventory_menu, inventory_goldypass_data, inventory_goldy_data, inventory_pets_data, inventory_goldypot_data, goldypetspage_data, goldypasspage_data } from 'utils/data';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { goldefy_ABI, goldefy_Address, RPC } from 'utils/contracts';
import { BarLoader } from 'react-spinners'
import Axios from 'core/utils/axios';

const Inventory = () => {
  const router = useRouter();
  const { tab } = router.query;

  const { account, library } = useWeb3React();
  const [ data, setData ] = useState([]);
  const [ text, setText ] = useState('');
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    setData([]);
    setLoading(true);
    switch(tab) {
      case 'goldy': setText('Goldy Owned'); break;
      case 'goldypass': setText('Goldy Pass'); break;
      case 'pets': setText('Pet Owned'); break;
      case 'goldypot': setText('Ticket Owned'); break;
    }
    if(tab == 'pets') {
      if(!account) {
        return;
      }
      const web3 = new Web3(RPC);
      const contract = new web3.eth.Contract(goldefy_ABI as any, goldefy_Address);
      contract.methods.tokensOfOwner(account, 0, 10).call()
        .then(async (result) => {
          const ids = result[0];
          const pettypes = result[1];
          setData(ids.map((id, i) => (
            {
              name: `Pet #${id}`,
              image: goldypetspage_data[pettypes[i]].image,
              type: pettypes[i]
            }
          )))
          setLoading(false);
        })   
        .catch(e => {
          setLoading(false);
        })   
    }
    else if(tab == 'goldypass') {
      Axios.post(`pass/inventory`)
        .then(resp => {
          setData(resp.data
          .map(each => ({...goldypasspage_data[each.type-1], ...each}))
          .map(each => ({
            id: each.id,
            image: `/images/goldypass/${each.name}.png`,
            stone: each.stone,
            stone_image: `/images/goldypass/${each.stone}.png`,
          })))
          setLoading(false);
        }
        )
        .catch(e => {
          setLoading(false);
        })
    }
    else if(tab) {
      setLoading(false);
    }
  }, [tab, account])
  let ChildComponent;
  switch(text) {
    case 'Goldy Owned': ChildComponent=GoldyCard; break;
    case 'Goldy Pass': ChildComponent=GoldyPassCard; break;
    case 'Pet Owned': ChildComponent=PetCard; break;
    case 'Ticket Owned': ChildComponent=GoldyPotCard; break;
    default: ChildComponent=GoldyCard;
  }
  return (
    <AccountLayout title={inventory_menu.find(each => each.path == router.asPath)?.title} submenu={inventory_menu} >
      <Panel 
        text={text}
        ChildComponent={ChildComponent}
        data={data}
        isLoading={isLoading}
      />
    </AccountLayout>
  )
}

const Panel = ({ text, data, ChildComponent, isLoading }) => {
  console.log('data', data);

  const [page, setPage] = useState(0);
  const maxPage = Math.floor((data.length - 1) / 3);
  return (
    <div className='relative flex flex-col px-[20px] h-[600px]'>
      <div className='bg-[#0B4851] w-[202px] h-[40px] mt-[44px] flex justify-between items-center rounded-[10px] px-4'>
        <div className='text-white'>{text}</div>
        <div className='text-[#43F3FF]'>{data.length}</div>
      </div>
      <div className='mt-[44px] flex'>
        {
          data.slice(page * 3, page * 3 + 3).map((each, key) => (
            <ChildComponent key={key} {...each} />
          ))
        }
      </div>
      <div className={cn('flex grow items-center justify-center text-white mt-[55px]', data.length <= 3 && 'hidden')}>
        <div className='flex items-center justify-center w-[25px] h-[28px] bg-[#1F808E] rounded-[5px] cursor-pointer'
          onClick={() => setPage(page > 0 ? page - 1 : 0)}
        >
          <div className={styles.arrow_left}></div>
        </div>
        <div className='ml-[11px] bg-[#032227] w-[49px] h-[30px] flex items-center justify-center rounded-[5px]'>
          {page + 1}
        </div>
        <div className='ml-[7px] mr-[15px]'>
          of {maxPage + 1}
        </div>
        <div className='flex items-center justify-center w-[25px] h-[28px] bg-[#1F808E] rounded-[5px] cursor-pointer'
          onClick={() => setPage(page < maxPage ? page + 1 : 0)}
        >
          <div className={styles.arrow_right}></div>
        </div>
      </div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <BarLoader color='white' loading={isLoading} />
      </div>
    </div>
  )
}

export default Inventory;
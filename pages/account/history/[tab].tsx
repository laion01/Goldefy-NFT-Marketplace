import styles from './index.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AccountLayout from 'components/layout/Account';
import { history_menu, inventory_goldypass_data, inventory_goldy_data, inventory_pets_data, inventory_goldypot_data, goldypetspage_data, goldypasspage_data } from 'utils/data';
import Image from 'next/image';
import Axios from 'core/utils/axios';
import { copy2Clipboard, truncateAddress } from 'utils';
import moment from 'moment';
import { BeatLoader } from 'react-spinners';
import { blockExplorer } from 'utils/contracts';

const goldypassTable = {
  trClassName: 'h-[90px]',
  cols: [
    {
      title: 'Item',
      className: 'w-[180px]',
      Component: ({row}) => (
        <div className='flex'>
          <Image src={`/images/goldypass/${goldypasspage_data[row.pass.type-1].name}.png`} width='50' height='50' />
          <div className='flex flex-col ml-[25px]'>
            <span className='text-white text-[17px]'>Pass #{row.pass.number}</span>
            <span className='text-[#44B8D2] text-[14px]'>{goldypasspage_data[row.pass.type-1].name}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Status / Type',
      className: 'w-[110px] text-center',
      Component: ({row}) => (
        <div className='text-center'>
          <div className='text-[#E1FAFF] text-[21px] capitalize'>{row.activity}</div>
          <div className='text-[#43FF75] text-[14px]'>Completed</div>
        </div>
      )
    },
    {
      title: 'Amount / Time',
      className: 'w-[130px] text-center',
      Component: ({row}) => (
        <div className='text-[#43FF75] text-[14px] text-center'>
          { moment(row.date * 1000).fromNow()}
        </div>
      )
    },
    {
      title: 'Txn Hash',
      className: 'w-[250px] text-center',
      Component: ({row}) => (
        <div className='flex justify-between items-center text-[#44B8D2] text-[14px] px-[20px]'>
          <a href={`${blockExplorer}/tx/${row.transactionHash}`} target='_blank' rel='noreferrer'>
          { truncateAddress(row.transactionHash, 3) }
          </a>
          <Image width='13' height='16' alt='' layout='fixed'
                src='/images/copy.png' className='cursor-pointer'
                onClick={() => copy2Clipboard(row['transactionHash'])}
            />
        </div>
      )
    },
  ],
}

const petsTable = {
  trClassName: 'h-[90px]',
  cols: [
    {
      title: 'Item',
      className: 'w-[180px]',
      Component: ({row}) => (
        <div className='flex'>
          <Image src={goldypetspage_data[row.pet.type].image} width='50' height='50' />
          <div className='flex flex-col ml-[25px]'>
            <span className='text-white text-[17px]'>Pet #{row.pet.tokenId}</span>
            <span className='text-[#44B8D2] text-[14px]'>{goldypetspage_data[row.pet.type].name}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Status / Type',
      className: 'w-[110px] text-center',
      Component: ({row}) => (
        <div className='text-center'>
          <div className='text-[#E1FAFF] text-[21px] capitalize'>{row.activity}</div>
          <div className='text-[#43FF75] text-[14px]'>Completed</div>
        </div>
      )
    },
    {
      title: 'Amount / Time',
      className: 'w-[130px] text-center',
      Component: ({row}) => (
        <div className='text-[#43FF75] text-[14px] text-center'>
          { moment(row.date * 1000).fromNow()}
        </div>
      )
    },
    {
      title: 'Txn Hash',
      className: 'w-[250px] text-center',
      Component: ({row}) => (
        <div className='flex justify-between items-center text-[#44B8D2] text-[14px] px-[20px]'>
          <a href={`${blockExplorer}/tx/${row.transactionHash}`} target='_blank' rel='noreferrer'>
          { truncateAddress(row.transactionHash, 3) }
          </a>
          <Image width='13' height='16' alt='' layout='fixed'
                src='/images/copy.png' className='cursor-pointer'
                onClick={() => copy2Clipboard(row['transactionHash'])}
            />
        </div>
      )
    },
  ],
}

export default function History() {
  const router = useRouter();
  const { tab } = router.query;
  const [tableInfo, setTableInfo] = useState({cols: []});
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const refresh = () => {
    setTableData([]);
    setLoading(true);
    switch(tab) {
      case 'pet': setTableInfo(petsTable); break;
      case 'pass': setTableInfo(goldypassTable); break;
      default: setTableInfo(petsTable); break;
    }
    if(tab == 'pet' || tab == 'pass') {
      Axios.post(`${tab}/history`, {
        per_page: '10',
        page: 1
      })
      .then(resp => {
        if(resp.error_code) {
          return;
        }
        setTableData(resp.data);
        setLoading(false);
      })
      .catch(e => setLoading(false));
    }
    else if(tab) {
      setTableData([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [tab]);

  const [page, setPage] = useState(0);
  const maxPage = Math.floor((tableData.length - 1) / 5);
  return (
    <AccountLayout title={history_menu.find(each => each.path == router.asPath)?.title} submenu={history_menu} >
      <div className='flex flex-col px-[4px] w-[779px]'>
        <div className='flex mt-[44px] justify-between'>
          <button className='border-[#43F3FF] border w-[143px] h-[40px] flex justify-between items-center rounded-[10px] pl-[21px] pr-[14px]'
            onClick={refresh}
          >
            <div className='text-white'>Refresh</div>
            <Image src='/images/account/history/refresh.svg' width='18' height='15' />
          </button>
          <div className='grow'></div>
          <div className='flex items-center justify-between w-[202px] h-[40px] bg-[#0B4851] rounded-[10px] text-white text-[15px] pl-[28px] pr-[15px]'>
            All Events
            <Image src='/images/account/history/arrowdown.svg' width='20' height='26' />
          </div>
          <div className='flex items-center justify-between w-[202px] h-[40px] bg-[#0B4851] rounded-[10px] text-white text-[15px] pl-[28px] pr-[15px] ml-[24px]'>
            All Time
            <Image src='/images/account/history/arrowdown.svg' width='20' height='26' />
          </div>
        </div>
        <div className='mt-[25px] flex'>
          <Table data={tableData.slice(page * 5, page * 5 + 5)} isLoading={isLoading} { ...tableInfo }/>
        </div>
        <div className={cn('flex grow items-center justify-center text-white mt-[33px] pb-[20px]', tableData.length <= 3 && 'hidden')}>
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
      </div>
    </AccountLayout>
  )
}

function Table({data, isLoading, trClassName = '', cols}) {
  return (
    <table className={cn('w-[779px] h-[455px] bg-[#0A414E] rounded-[12px] text-white text-[15px]', styles.table)}>
      <thead>
        <tr className='h-[47px] border-b-[1px] border-[#0A667B]'>
        {
          cols?.map(({className, title}, key) => (
            <td key={key} className={cn(className, 'text-left pl-[33px]')}>
              {title}
            </td>
          ))
        }
        </tr>
      </thead>
      <tbody className='relative'>
        {
          isLoading && 
          <tr>
            <td className='absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              Loading
              <BeatLoader color='white' />
            </td>  
          </tr>
        }
        {
          !isLoading && data.length == 0 &&
          <tr>
            <td className='absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Image src='/images/account/history/no-content.svg' width='144' height='135' />
              <div className='pt-[26px]'>
                Sorry, No record found.
              </div>
            </td>  
          </tr>
        }
        {
          data.map((row, key) => (
            <tr key={key} className={cn(trClassName, 'border-b-[1px] border-[#0A667B]')}>
              {cols.map(({Component}, key) => (
                <td key={key} className='pl-[33px]'>
                  <Component row={row} />
                </td>
              ))}
            </tr>
          ))
        }
        <tr className='h-[15px]'>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  )
}
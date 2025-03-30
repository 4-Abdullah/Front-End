'use client'

import { useSearchParams, useParams } from 'react-router-dom'
import Data from './data';
import { Suspense } from 'react';

const Param=()=>{
    const { id } = useParams(); //
    //   const user = searchParams.get("username");
    const [searchParams]=useSearchParams();
// const id =searchParams.get('id')
const user =searchParams.get('username')
console.log(id, user)
return(<>
        <Suspense>
        <Data id={id} user={user} />
        </Suspense>
        </>
)
}
export default Param
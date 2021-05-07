import Preloader from "../components/Common/Preloader/Preloader";
import React, {Suspense} from 'react';

export const withSuspense = (Component) => {
  return (props) => {
    return (
    <Suspense fallback={<Preloader/>}>
      <Component {...props}/>
    </Suspense>
    )
  }
}
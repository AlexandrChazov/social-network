import Preloader from "../components/Common/Preloader/Preloader";
import React, {Suspense} from 'react';

export function withSuspense(Component: React.ComponentType) { //WCP - WrappedComponentProps (есть видео на канале IT-Kamasutra)
  return () => {
    return (
    <Suspense fallback={<Preloader/>}>
      <Component/>
    </Suspense>
    )
  }
}
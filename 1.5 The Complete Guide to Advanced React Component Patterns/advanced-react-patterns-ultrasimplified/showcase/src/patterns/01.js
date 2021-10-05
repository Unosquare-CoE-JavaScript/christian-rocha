import React, {Component, useState} from 'react';
import styles from './index.css';
import mojs from 'mo-js';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

/**
 * HOC
 */

const withClapAnimation = WrappedComponent => {
  class WithClapAnimation extends Component {
  animationTimeline = new mojs.Timeline();
  state = {
     animationTimeline: this.animationTimeline
   }

   componentDidMount() {
     const tlDuration = 300;
    const scaleButton = new mojs.Html({
      el: '#clap',
      duration: tlDuration,
      scale: {1.3: 1},
      easing: mojs.easing.ease.out
    })
    
    const triangleBurst = new mojs.Burst({
      parent: '#clap',
      radius: {50: 95},
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: {6:0},
        stroke: 'rgba(211,54,0,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration

      }
    })

    const countAnimation = new mojs.Html({
      el: '#clapCount',
      opacity: {0:1},
      y: {0: -30},
      duration: tlDuration
    }).then({
      opacity: {0:1},
      y:-220,
      delay: tlDuration/2,
    })

    const countTotalAnimation = new mojs.Html({
      el: '#clapCountTotal',
      opacity: {0:1},
      delay:(3 * tlDuration) / 2,
      duration: tlDuration,
      y: {0: -3}
    })

    const circleBurst = new mojs.Burst({
      parten: '#clap',
      radius: {50: 75},
      angle: 25,
      duration: tlDuration,
      children: {
        shape: 'circle',
        fill: 'rgba(149,165,166,0.5)',
        delay:30,
        speed: 0.2,
        radius: {3:0},
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    })

    const clap = document.getElementById('clap');
    clap.style.transform = 'scale(1,1)'

    const newAnimationTimeline = this.animationTimeline.add([scaleButton, countTotalAnimation, countAnimation, triangleBurst, circleBurst])
    this.setState({animationTimeline: newAnimationTimeline})
   }

    render() {
      return <WrappedComponent {...this.props} animationTimeline={this.state.animationTimeline} />
    }
  }
  return WithClapAnimation
}

const Clap = ({ animationTimeline }) => {  
  const MAXIMUM_USER_CLAP = 12;
  const [clapSate, setClapState] = useState(initialState)

  const {count, countTotal, isClicked} = clapSate;

  const handleClapClick = () => {
    animationTimeline.replay();
    setClapState(prevState => ({
      isClicked: true,
      count: Math.min(prevState.count + 1, MAXIMUM_USER_CLAP),
      countTotal: prevState.count < MAXIMUM_USER_CLAP ?  prevState.countTotal + 1 :  prevState.countTotal
    }))
  }

  return <button id='clap' className={styles.clap} onClick={handleClapClick}>
    <ClapIcon isClicked={isClicked} />
    <ClapCount count={count} />
    <CountTotal countTotal={countTotal} />
  </button>
}

/**
 * Subcomponents
 */

const ClapCount = ({count}) => {
  return <span id='clapCount' className={styles.count}>
    + {count}
  </span>
}

const CountTotal =({countTotal}) => {
  return <span id='clapCountTotal' className={styles.total}>
    {countTotal}
  </span>
}

const ClapIcon = ({isClicked}) => {
  return <span>
    <svg className={`${styles.icon} ${isClicked && styles.checked}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 112.5"><path d="M65.199 10.508c-.891-.869-2.558-.962-4.073.542L48.684 23.045c-.521.504-1.183-.084-.641-.641L59.632 10.29c3.713-3.771-1.359-8.198-4.881-4.625-6.25 6.267-12.536 12.532-18.786 18.781-.511.516-1.281-.254-.766-.765.833-.828 1.266-1.297 1.558-2.047 1.354-4.354 1.432-7.817.521-10.338-.911-2.516-3.026-4.042-5.401-3.979a1.112 1.112 0 0 0-1.067.938c-.646 4.016-2.406 7.391-4.141 11.156-1.734 3.76-3.427 7.916-3.698 13.354-.083 2.416-1.166 6.124-2.302 8.457-.442.912-.177 1.24.526 1.943l7.833 7.833a.325.325 0 0 0 .011-.066V50.9c.286-5.755 2.099-10.183 3.859-14 1.76-3.807 3.411-7.02 4-10.698a2.875 2.875 0 0 1 2.744-2.406c3.156-.088 5.964 2.016 7.094 5.13.813 2.249.698 5.083.125 8.198 4.823-4.818 9.662-9.635 14.469-14.454 2.203-2.238 5.354-2.244 7.292-.733l1.641-1.724c2.953-3.303-1.313-7.47-4.511-4.48L53.313 27.659c-.51.496-1.104-.17-.641-.645l11.995-12.402c1.552-1.593 1.433-3.239.542-4.109l-.01.005zM19.829 44.811c-2.119-2.12-4.067-.604-6.192 1.52l-2.438 2.439c-2.125 2.124-2.12 5.588 0 7.708l8.073 8.072 1.083-1.088c1.099-1.094 2.188-2.161 3.646-2.703 2.396-.204 2.24-.067 2.906-2.073.646-1.323 1.287-3.313 1.693-5.099l-8.771-8.776z"/><path d="M73.007 28.743c-.891-.87-2.553-.969-4.073.536L56.496 41.273c-.521.505-1.183-.083-.641-.64l11.589-12.109c3.708-3.776-1.359-8.202-4.881-4.625-6.25 6.26-12.541 12.526-18.791 18.775-.506.517-1.276-.254-.761-.76.828-.828 1.261-1.303 1.558-2.052 1.354-4.355 1.432-7.817.521-10.333-.917-2.521-3.026-4.047-5.406-3.98a1.113 1.113 0 0 0-1.067.933c-.646 4.015-2.401 7.391-4.141 11.156-1.734 3.76-3.422 7.916-3.693 13.359-.083 2.417-1.166 6.125-2.302 8.453-.448.912-.183 1.24.521 1.942l12.725 12.724c1.76 1.762 2.697-1.187 7.172-2.317.994-.245 2.266-.344 3.932-.812 3.323-.939 8.006-3.35 15.953-11.297l.047-.047 10.406-11.521c3.229-3.578-1.005-7.511-4.364-4.297l-8.089 7.729c-.375.365-1.005-.224-.619-.619l11.906-12.491c2.947-3.301-1.318-7.468-4.511-4.479L61.121 45.888c-.511.5-1.109-.167-.646-.64L72.47 32.847c1.558-1.594 1.433-3.24.542-4.109l-.005.005zM28.351 84.045c2.119 2.119 5.583 2.119 7.708 0l2.438-2.443c2.125-2.12 3.641-4.068 1.521-6.188L27.642 63.04c-2.119-2.12-4.067-.604-6.192 1.515l-2.438 2.442a5.458 5.458 0 0 0 0 7.709l9.339 9.339z"/><text y="105" font-size="5" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Cuputo</text><text y="110" font-size="5" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
  </span>
}


const Usage = () => {
  const AnimatedMediumClap = withClapAnimation(Clap);
  return <AnimatedMediumClap />
}

export default Usage

import spinner from './assets/spinner.gif'

function Spinner() {
  return (
    <div className="w100 mt-20">
        <img src={spinner} alt="Loading..." className="text-center mx-auto" width={180}/>
    </div>
  )
}

export default Spinner
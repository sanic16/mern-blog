import { FadeLoader } from "react-spinners"

const Spinner = () => {
  return (
    <div className="center">
      <FadeLoader 
        color="#6f6af8"
        loading={true}
        height={15}
        width={5}
        className="loader__spinner"
      />
    </div>
  )
}

export default Spinner
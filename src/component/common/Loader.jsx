import { Oval } from "react-loader-spinner";

const FullScreenLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}>
      <Oval
        height={60}
        width={60}
        color="#fff"
        secondaryColor="#ccc"
        strokeWidth={4}
        visible={true}
      />
    </div>
  );
};

export default FullScreenLoader;
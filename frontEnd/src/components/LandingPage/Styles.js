import { makeStyles } from "@mui/styles";

const styles = (theme) => {
  return {
    toolBar: {
      height: "10vh",
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      backgroundColor: "#d1d9ff",
    },
    logo: {
      color: "#6f79a8",
      cursor: "pointer",
    },
    link: {
      color: "#6f79a8",
    },
    menuIcon: {
      color: "#000",
    },
    formContainer: {
      flexGrow: 1,
      padding: "10px",
      maxWidth: "700px",
      margin: "30px auto",
      marginBottom: "100px",
      [theme.breakpoints.between("xs", "sm")]: {
        width: "100%",
      },
    },
    form: {
      marginTop: "30px",
    },
    formHeading: {
      textAlign: "center",
    },
    heroBox: {
      width: "100%",
      display: "flex",
      minHeight: "600px",
      alignItems: "center",
      justifyContent: "center",
    },
    gridContainer: {
      display: "flex",
      alignItems: "center",
      maxWidth: "1300px",
      padding: "50px",
    },
    aboutUsContainer: {
      width: "100%",
      display: "flex",
      minHeight: "400px",
      alignItems: "center",
      justifyContent: "center",
      margin: "30px 0px 50px 0px",
    },
    aboutUsSubtitle: {
      opacity: "0.7",
      paddingBottom: "30px",
      fontSize: "18px",
    },
    title: {
      paddingBottom: "15px",
    },
    subtitle: {
      opacity: "0.4",
      paddingBottom: "30px",
    },
    largeImage: {
      width: "100%",
    },
    sectionGridContainer: {
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minHeight: "500px",
    },
    sectionGridItem: {
      backgroundColor: "#d1d9ff",
      textAlign: "center",
      padding: "30px",
      width: "200px",
      borderRadius: "10px",
      margin: "10px !important",
    },
    inputField: {
      marginBottom: "20px !important",
    },
    textArea: {
      width: "100%",
      marginBottom: "20px",
      fontSize: "16px",
      padding: "10px",
    },
    footerContainer: {
      display: "flex",
      alignItems: "center",
      miHeight: "10vh",
      padding: "20px",
      justifyContent: "center",
      backgroundColor: "#f2f0f1",
      flexDirection: "column",
    },
    footerText: {
      paddingBottom: "10px",
    },
    footerDate: {
      opacity: "0.4",
    },
  };
};

const useStyles = makeStyles(styles);
export default useStyles;

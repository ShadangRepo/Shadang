import { Button, FormControlLabel, Grid, makeStyles, Switch, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { AppContext } from "./AppContext";
import { useGlobalStyles } from "../shared/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #dcdcdc",
    borderRadius: 10,
  },
  uploadContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 210,
    width: "100%",
    backgroundColor: "#f0f0f0",
    border: "1px solid #dcdcdc",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflowX: "scroll",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  noFilesText: {
    fontWeight: "bold",
    color: "#C0C0C0",
  },
  filePreview: {
    width: 100,
    height: 100,
    border: "1px solid #dcdcdc",
    margin: 5,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  uploadingLabel: {
    color: "#525252",
    marginRight: 20,
  },
  checkLabel: {
    fontSize: 12
  }
}));

const UploadHandler = (props) => {
  const {
    chooseLabel,
    multiple,
    accept,
    onChange //onChange function is triggered on upload complete and change of active status of image
  } = props;
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [uploadedFiles, setUploadedFiles] = useState([]); //last object in this array is considered for uploading
  const [filesToUpload, setFilesToUpload] = useState([]);
  const fileRef = useRef();
  const { user } = useContext(AppContext);
  const [progress, setProgress] = useState(0);

  const chooseImages = () => {
    fileRef.current.click();
  };

  const uploadFiles = (fileData) => {
    if (uploadedFiles.length > 0) {
      if (!fileData.url) {
        setProgress(0);
        let name = fileData.file.name.split(".");
        let extension = name[name.length - 1];
        let fileName = `${new Date().getTime()}_${Math.floor(
          Math.random() * 10000000000000
        )}.${extension}`;
        const uploadTask = storage
          .ref(
            `images/exhibitions/${user.firstName}_${user.lastName}/${fileName}`
          )
          .put(fileData.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log("Upload error: ", error);
            return false;
          },
          () => {
            storage
              .ref(`images/exhibitions/${user.firstName}_${user.lastName}`)
              .child(fileName)
              .getDownloadURL()
              .then((url) => {
                let progressData = [...uploadedFiles];
                progressData = progressData.map((item) =>
                  item.id === fileData.id
                    ? { ...item, url, progress: 100 }
                    : item
                );
                if (filesToUpload[progressData.length]) {
                  //push next object to upload
                  progressData.push(filesToUpload[progressData.length]);
                  setUploadedFiles(progressData);
                } else {
                  setUploadedFiles(progressData);
                  let urlList = progressData.map(({ url, active }) => ({ url, active }));
                  onChange(urlList);
                }
              });
          }
        );
      } else {
        let progressData = [...uploadedFiles];
        if (filesToUpload[progressData.length]) {
          //push next object to upload
          progressData.push(filesToUpload[progressData.length]);
          setUploadedFiles(progressData);
        } else {
          setUploadedFiles(progressData);
          let urlList = progressData.map(({ url, active }) => ({ url, active }));
          onChange(urlList);
        }
      }
    }
  };

  useEffect(() => {
    if (uploadedFiles.length > 0 && uploadedFiles[uploadedFiles.length - 1]) {
      setProgress(0);
      uploadFiles(uploadedFiles[uploadedFiles.length - 1]); //send last object in uploadedFiles array for upload
    }
  }, [uploadedFiles.length]);

  useEffect(() => {
    if (filesToUpload.length > 0 && filesToUpload[uploadedFiles.length]) {
      setUploadedFiles([...uploadedFiles, filesToUpload[uploadedFiles.length]]);
    }
  }, [filesToUpload]);

  const handleFilesChange = (event) => {
    let files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const newFileData = {
          file: files[i],
          url: null,
          active: true
        };
        newFileData["id"] = Math.floor(Math.random() * 10000000000000);
        setFilesToUpload((prevState) => [...prevState, newFileData]);
      }
    }
  };

  const changeActiveStatus = (checked, url) => {
    let newImages = [...uploadedFiles]; // If you are changing status means uploaded files and files to upload are same
    newImages = newImages.map(item => item.url === url ? { ...item, active: checked } : item);
    setFilesToUpload([...newImages]);
    setUploadedFiles([...newImages]);
    let urlList = newImages.map(({ url, active }) => ({ url, active }));
    onChange(urlList);
  }

  let uploadInProgress = filesToUpload.length > 0 && (filesToUpload.length !== uploadedFiles.length || (filesToUpload.length === uploadedFiles.length && progress !== 100));

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item container xs={12} className={classes.uploadContainer}>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((item, i) => (
            <Grid item xs={6} md={3} key={`${i}`} className={`${globalClasses.justifyContentCenter}`}>
              {item && item.url ? (
                <div className={globalClasses.flexColumn}>
                  <img
                    src={item.url}
                    alt="file"
                    className={classes.filePreview}
                  />
                  {!uploadInProgress && <div className={globalClasses.justifyContentCenter}>
                    <FormControlLabel
                      classes={{ label: classes.checkLabel }}
                      control={
                        <Switch
                          id="active"
                          color="primary"
                          size="small"
                          checked={item.active}
                          onChange={event => changeActiveStatus(event.target.checked, item.url)}
                        />}
                      label="Active" />
                  </div>}
                </div>
              ) : (
                <Box
                  position="relative"
                  display="inline-flex"
                  className={classes.filePreview}
                >
                  <CircularProgress variant="determinate" value={progress} />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="textSecondary"
                    >{`${progress}%`}</Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          ))
        ) : (
          <Typography className={classes.noFilesText}>
            No files selected
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} className={classes.buttonContainer}>
        <input
          ref={fileRef}
          type="file"
          style={{ display: "none" }}
          name="files"
          id="files"
          multiple={multiple || false}
          onChange={handleFilesChange}
          accept={accept}
        />
        {uploadInProgress && (
          <Typography className={classes.uploadingLabel}>
            {`Uploading ${uploadedFiles.length}/${filesToUpload.length}`}
          </Typography>
        )}
        <Button
          variant="outlined"
          color="primary"
          className={classes.actionButton}
          onClick={chooseImages}
          disabled={uploadInProgress}
        >
          {chooseLabel || "Choose"}
        </Button>
      </Grid>
    </Grid>
  );
};

export { UploadHandler };

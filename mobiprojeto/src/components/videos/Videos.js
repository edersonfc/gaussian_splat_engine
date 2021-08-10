/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated, Easing
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';

import { useNavigation } from "@react-navigation/native";

import ScreenOrientation, { PORTRAIT, LANDSCAPE, LANDSCAPE_LEFT } from "react-native-orientation-locker/ScreenOrientation";

// LINK FONT => https://www.npmjs.com/package/react-native-video-compressor
// import VideoCompress from 'react-native-video-compressor'´

// LINK FONT => https://www.npmjs.com/package/react-native-video-processing
import { ProcessingManager } from 'react-native-video-processing';

import Icon from 'react-native-vector-icons/FontAwesome';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

//MINHAS VARIAVEIS ABAIXO
var URLs_Videos = new Array();
//MINHAS VARIAVEIS ACIMA



//IMPLEMENTANDO ICONE ROTACIONAL ABAIXO
var spinValue = new Animated.Value(0);

// First set up animation 
Animated.loop(
  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true  // To make use of native driver for performance
    }
  )
).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
//IMPLEMENTANDO ICONE ROTACIONAL ACIMA


export default class CameraScreen extends React.Component { //LINHA TROCADO PELA LINHA ABAIXO
  //class CameraScreen extends React.Component {






  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    // ratio: '16:9',
    ratio: '4:3',
    recordOptions: {
      mute: false,
      maxDuration: 30,
      quality: RNCamera.Constants.VideoQuality['288p'],
      // quality: RNCamera.Constants.VideoQuality['480p'],
      videoBitrate: 4000000 //=> ESEE VALOR ESTÁ MUITO ALTO
      // videoBitrate: 600000 //AQUI ESTÁ O SEGREDO DO TAMANHO DO VIDEO IMPORTANTISSIMO PARA NÃO TRAVAR
    },
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
  };


  //const  navigation = useNavigation();



  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  touchToFocus(event) {
    const { pageX, pageY } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }

    this.setState({
      autoFocusPoint: {
        normalized: { x, y },
        drawRectPosition: { x: pageX, y: pageY },
      },
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  /*
  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.warn('takePicture ', data);
    }
  };
  */

  takeVideo = async () => {
    /*
    const [gravarVideo,  setGravarVideo] = useState(true);//APAGAR CASO NÃO DE CERTO
    const [navegarVideo, setnavegarVideo] = useState(false);//APAGAR CASO NÃO DE CERTO
    */
    const { navigation } = this.props;

    const { isRecording } = this.state;
    if (this.camera && !isRecording) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          //console.warn('takeVideo', data);
          // alert(data.uri);
          //var URLs_Videos = data.uri;

          // https://github.com/react-native-video/react-native-video#android-installation




          // //TENTANDO COMPRIMIR VIDEO AQUI ABAIXO PARTE 2

          // //CHAMANDO O ALGORITMO DE COMPRESSAO DE VIDEO MAS NÃO ESTÁ SENDO USADO ABAIXO
          // const { path, caminhoOriginal, thumbnail } = await compressVideo(data.uri);
          // // console.log(  path   );
          // // console.log(  caminhoOriginal   );
          // // console.log(  thumbnail   );
          // URLs_Videos.push(path);
          // // URLs_Videos.push(caminhoOriginal);
          // //CHAMANDO O ALGORITMO DE COMPRESSAO DE VIDEO MAS NÃO ESTÁ SENDO USADO ABAIXO
        

          URLs_Videos.push(data.uri);
           var URL_VIDEOS = '';
           for (var i = 0; i < URLs_Videos.length; i++) {
             URL_VIDEOS += URLs_Videos[i] + '|';
           }//FOR
          
           navigation.navigate("Postar", { URL_VIDEOS });
    


          //ALGORITIMO DE COMPRESSAO DE VIDEO ABAIXO processamento DEMORADO ABAIXO  MAS FUNCIONA PERFEITAMENTE ABAIXO
          async function compressVideo(path) {
            // console.log(path);
            let caminhoOriginal = path;
            const origin = await ProcessingManager.getVideoInfo(path);
            const result = await ProcessingManager.compress(path, {
              width:  origin.size && origin.size.width / 3,
              height: origin.size && origin.size.height / 3,
              // bitrateMultiplier: 7,
              bitrateMultiplier: 4,
              minimumBitrate: 300000
            });
            const thumbnail = await ProcessingManager.getPreviewForSecond(result.source);

            return { path: result.source, caminhoOriginal, thumbnail };
            //ALGORITIMO DE COMPRESSAO DE VIDEO ACIMA processamento DEMORADO ACIMA  MAS FUNCIONA PERFEITAMENTE ACIMA
           
          }
          // //TENTANDO COMPRIMIR VIDEO AQUI ACIMA PARTE 2





          /*  FOI DESATIVADO TROCADO PELO CÓDIGO COMPACTADOR DE VIDEOS ACIMA
          //ATIVAR AQUI ABAIXO CASO NÃO DE CERTO ABAIXO
          URLs_Videos.push(data.uri);
          var URL_VIDEOS = '';
          for (var i = 0; i < URLs_Videos.length; i++) {
            URL_VIDEOS += URLs_Videos[i] + '|';
          }//FOR
          navigation.navigate("Postar", { URL_VIDEOS });
          //ATIVAR AQUI ACIMA CASO NÃO DE CERTO ACIMA
         */






        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

  facesDetected = ({ faces }) => this.setState({ faces });

  renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` },
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    >
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
  );

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
            style = { borderWidth: 1 }]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );

  renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );

  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
  );

  renderTextBlock = ({ bounds, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  );

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };



  renderRecording = () => {
    // const { navigation } = this.props;
    const { isRecording } = this.state;
    // const backgroundColor = isRecording ? 'white' : 'green';
    const action = isRecording ? this.stopVideo : this.takeVideo;
    const button = isRecording ? this.renderStopRecBtn() : this.renderRecBtn();
    return (
      <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: '100%', padding: 0 }}

        onPress={() =>
          action()
        }
      >
        {button}
      </TouchableOpacity>
    );
  };


  stopVideo = async () => {
    await this.camera.stopRecording();
    this.setState({ isRecording: false });
  };

  renderRecBtn() {
    return <Text style={[style = {
      borderWidth: 1,
      borderRadius: 8,
      padding: 7,
      width: '100%',
      height: '100%',

      textAlign: 'center',

      borderColor: 'orange',
      color: 'white',
      backgroundColor: 'green'

    }]}>Gravar Video</Text>;


  }

  renderStopRecBtn() {
    /*return <Text style={styles.flipText}> ☕ </Text>;*/

    // return <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: '100%' }}>
    return  <Text style={[style = {
        borderWidth: 0,
        borderRadius: 8,
        padding: 7,
        width: '90%',
        height: '100%',

        textAlign: 'center',

        borderColor: 'orange',
        color: 'white',
        // backgroundColor:'red'
      }]}>Parar Gravação</Text>;

    //   <Animated.View style={{ transform: [{ rotate: spin }], width: '10%', borderWidth: 1 }} >
    //     <Icon name='spinner' style={{ fontSize: 18, color: '#FFF' }} />
    //   </Animated.View>;
    // </TouchableOpacity>;
  }

  renderCamera() {

    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

    const { navigation } = this.props;

    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    return (

      <View style={{ width: '100%', height: '100%', borderWidth: 0, borderColor: 'yellow' }}>

        {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ABAIXO  coloca dentro da View principal que fica dentro do return*/}
        <ScreenOrientation
          orientation={LANDSCAPE_LEFT}
        // onChange={orientation => console.log('onChange', orientation)}
        // onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
        />
        {/* MUDANDO A ORIENTAÇÃO DA TELA PRA PAISAGEM ACIMA   coloca dentro da View principal que fica dentro do return */}

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          captureAudio={false}
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
          zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
          focusDepth={this.state.depth}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks
              ? RNCamera.Constants.FaceDetection.Landmarks.all
              : undefined
          }
          onFacesDetected={canDetectFaces ? this.facesDetected : null}
          onTextRecognized={canDetectText ? this.textRecognized : null}
          onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
        >
          <View style={StyleSheet.absoluteFill}>
            <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
            <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          </View>

          <View
            style={{
              flex: 0.5,
              height: 72,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >


            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                <Text style={styles.flipText}> FLIP </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
                <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
              </TouchableOpacity>
            </View>



            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton}>
                <Text style={styles.flipText}>
                  {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
                <Text style={styles.flipText}>
                  {!canDetectText ? 'Detect Text' : 'Detecting Text'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
                <Text style={styles.flipText}>
                  {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ bottom: 0 }}>

            <View
              style={{
                height: 20,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}
            >
              {/*
            <Slider
              style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
              onValueChange={this.setFocusDepth.bind(this)}
              step={0.1}
              disabled={this.state.autoFocus === 'on'}
            />
            */}
            </View>


            {/* TIRADO DAQUI */}

            {this.state.zoom !== 0 && (
              <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
            )}



            {/* FAIXA DE BOTÕES ABAIXO */}
            <View style={{ flexDirection: 'row', justifyContent: 'center',  /*height:80,*/ width: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  // height: 100,
                  // alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  borderWidth: 0,
                  borderColor: 'yellow',
                  backgroundColor: 'transparent'
                }}
              >

                {/* POSTO AQUI ABAIXO

          <View
            style={{ flex: 0.1,
              height: 56,
              backgroundColor: 'transparent',
              backgroundColor: 'blue',
              flexDirection: 'row',
              alignSelf: 'flex-end',

            }}
          >
            {this.renderRecording()}

          </View>
        */}
                <TouchableOpacity
                  style={[styles.flipButton, { flex: 0.30, padding: 0 }, style = { backgroundColor: 'red', width: '100%' }]}
                >
                  {this.renderRecording()}
                </TouchableOpacity>

                {/* POSTO AQUI ACIMA*/}

                <TouchableOpacity
                  style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                  onPress={this.zoomIn.bind(this)}
                >
                  <Text style={styles.flipText}> + </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                  onPress={this.zoomOut.bind(this)}
                >
                  <Text style={styles.flipText}> - </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
                  onPress={this.toggleFocus.bind(this)}
                >
                  <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
                </TouchableOpacity> */}


                {/*
            <TouchableOpacity
              style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
              onPress={this.takePicture.bind(this)}
            >
              <Text style={styles.flipText}> Tirar Foto </Text>
            </TouchableOpacity>
            */}
              </View>
            </View>
          </View>
          {/* FAIXA DE BOTÕES ACIMA */}

          {!!canDetectFaces && this.renderFaces()}
          {!!canDetectFaces && this.renderLandmarks()}
          {!!canDetectText && this.renderTextBlocks()}
          {!!canDetectBarcode && this.renderBarcodes()}
        </RNCamera>

      </View>

    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }



}//CHAVE PERTENCENTE A CLASSE PRINCIPAL



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import FormData from 'form-data';
import Share from 'react-native-share';

import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const createFormData = photo => {
  const data = new FormData();
  data.append('file', {
    name: '1.jpeg',
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    body: photo.data,
    type: 'image/jpeg',
  });

  /*  data.append('image', {
    uri:
      'content://com.google.android.apps.photos.contentprovider/-1/1/content%3A%2F%2Fmedia%2Fexternal%2Fimages%2Fmedia%2F76/ORIGINAL/NONE/540442700',

    name: 'userProfile.jpg',
    type: 'image/jpg',
  }); */

  console.log(data);
  return data;
};

const filters = [
  {key: 'laplace', label: 'Laplace'},
  {key: 'gaussian', label: 'Gaussian'},
  {key: 'median', label: 'Median'},
  {key: 'tv', label: 'TV'},
  {key: 'prewitt', label: 'Prewitt'},
  {key: 'roberts', label: 'Roberts'},
  {key: 'frangi', label: 'Frangi'},
  {key: 'meijering', label: 'Meijering'},
  {key: 'scharr', label: 'Scharr'},
];
const histo = [
  {key: 'show', label: 'Show Histogram'},
  {key: 'equalize', label: 'Equalizer'},
];
const transforms = [
  {key: 'rescale', label: 'Rescale'},
  {key: 'resize', label: 'Resize'},
  {key: 'downscale_local_mean', label: 'Down Scale Local Mean'},
  {key: 'rotate', label: 'Rotate'},
  {key: 'swirl', label: 'Swirl'},
  {key: 'crop', label: 'Crop'},
  {key: 'rescale_intensity', label: 'Rescale Intensity'},
];

class App extends Component {
  state = {
    avatarSource: {
      uri:
        'content://com.google.android.apps.photos.contentprovider/-1/1/content%3A%2F%2Fmedia%2Fexternal%2Fimages%2Fmedia%2F76/ORIGINAL/NONE/540442700',
    },
    loading: false,
    showResult: false,
    photo: {},
  };

  shareFile = () => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      url: this.state.avatarSource.uri,
      social: Share.Social.WHATSAPP,
      filename: 'IP Project Result', // only for base64 file in Android
    };
    Share.shareSingle(shareOptions);
  };

  makeFilter = type => {
    this.setState({loading: true});
    const formData = createFormData(this.state.photo);
    const config = {
      method: 'POST',
      body: formData,
    };

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/make_filter?type=' + type,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    })
      .then(res => {
        var reader = new window.FileReader();
        reader.readAsDataURL(res.data);
        reader.onload = () => {
          var imageDataUrl = reader.result;
          console.log('src', imageDataUrl);
          this.setState({
            error: null,
            loading: false,
            avatarSource: {uri: imageDataUrl},
          });
        };
      })
      .catch(err => {
        console.log(err);
        this.setState({error: 'En error ocurred.', loading: false});
      });
  };
  makeHisto = type => {
    this.setState({loading: true});
    const formData = createFormData(this.state.photo);
    const config = {
      method: 'POST',
      body: formData,
    };

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/histo?type=' + type,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    })
      .then(res => {
        var reader = new window.FileReader();
        reader.readAsDataURL(res.data);
        reader.onload = () => {
          var imageDataUrl = reader.result;
          console.log('src', imageDataUrl);
          this.setState({
            error: null,
            loading: false,
            avatarSource: {uri: imageDataUrl},
          });
        };
      })
      .catch(err => {
        console.log(err);
        this.setState({error: 'En error ocurred.', loading: false});
      });
  };
  transform = type => {
    this.setState({loading: true});
    const formData = createFormData(this.state.photo);
    const config = {
      method: 'POST',
      body: formData,
    };

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/transform?type=' + type,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    })
      .then(res => {
        var reader = new window.FileReader();
        reader.readAsDataURL(res.data);
        reader.onload = () => {
          var imageDataUrl = reader.result;
          console.log('src', imageDataUrl);
          this.setState({
            error: null,
            loading: false,
            avatarSource: {uri: imageDataUrl},
          });
        };
      })
      .catch(err => {
        console.log(err);
        this.setState({error: 'En error ocurred.', loading: false});
      });
  };

  showPicker = () => {
    const options = {
      title: 'Select Avatar',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        console.log('Source = ', source);

        this.setState({
          avatarSource: source,
          avatarContent: response.data,
          photo: response,
        });
      }
    });
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.body}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: '20%',
            }}
            onPress={this.showPicker}>
            <View style={{flex: 1}}>
              <ModalSelector
                style={{flex: 1, padding: '5%'}}
                data={filters}
                placeholder="Select a Filter"
                onChange={option => {
                  this.makeFilter(option.key);
                }}>
                <TextInput
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    selfAlign: 'center',
                    textAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderRadius: 6,
                  }}
                  editable={false}
                  placeholder="Filters"
                />
              </ModalSelector>
              <ModalSelector
                style={{flex: 1, padding: '5%'}}
                data={histo}
                placeholder="Select a Filter"
                onChange={option => {
                  this.makeHisto(option.key);
                }}>
                <TextInput
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    selfAlign: 'center',
                    textAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderRadius: 6,
                  }}
                  editable={false}
                  placeholder="Histogram"
                />
              </ModalSelector>
            </View>
            <View style={{flex: 1}}>
              <ModalSelector
                style={{flex: 1, padding: '5%'}}
                data={transforms}
                placeholder="Transformation"
                onChange={option => {
                  this.transform(option.key);
                }}>
                <TextInput
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    selfAlign: 'center',
                    textAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'grey',
                    borderRadius: 6,
                  }}
                  editable={false}
                  placeholder="Transformation"
                />
              </ModalSelector>
              {/*  <TouchableOpacity
                onPress={this.shareFile}
                style={{
                  flex: 1,
                  padding: '5%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderWidth: 1,
                  borderColor: 'orange',
                  borderRadius: 6,
                }}>
                <Text>SHARE</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          {this.state.error && (
            <Text
              style={{color: 'red', alignSelf: 'center', textAlign: 'center'}}>
              {this.state.error}
            </Text>
          )}

          {this.state.loading && <ActivityIndicator size="large" />}

          {!this.state.loading && (
            <ImageBackground
              resizeMode="center"
              style={{height: '100%', width: '100%'}}
              source={require('./download.png')}>
              <TouchableOpacity
                onPress={this.showPicker}
                style={{width: '100%', height: '80%'}}>
                <Image
                  resizeMode="stretch"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={this.state.avatarSource}
                />
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    height: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: '5%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

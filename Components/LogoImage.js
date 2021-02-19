import React from 'react';

import {View, Image} from 'react-native';

const LogoImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={{
          width: 65,
          height: 50,
          marginLeft: 15,
          marginRight: 15
        }}
      />
    </View>
  );
};

export default LogoImage;
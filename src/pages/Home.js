import React, {PureComponent} from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
  Subtitle,
  Content,
  Item,
  Label,
  Input,
  Button,
  Text,
  Card,
  CardItem,
  Picker,
  View
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import { KEY, URL } from '../components/Const';

export default class Home extends PureComponent {

  constructor() {
    super();
    this.state = {
      provinces: [],
      originCities: [],
      destinationCities: [],
      selectedOriginProvince: null,
      selectedOriginCity: null,
      selectedDestinationProvince: null,
      selectedDestinationCity: null,
      weight:0,
      courier:null
    }
  }

  componentDidMount() {
    this.onLoadProvince();
  }

  onLoadProvince = () => {
    fetch(URL + '/province', {
      method: 'GET',
      headers: {
        'key': KEY
      }
    }).then((response) => response.json()).then((responseData) => {
      console.log(responseData);
      let status = responseData['rajaongkir']['status']['code'];
      if (status == 200) {
        this.setState({provinces: responseData['rajaongkir']['results']
        })
      }
    });
  }

  onOriginProvinceChange = (val) => {
    console.log(val);
    this.setState({
      selectedOriginProvince: val
    }, () => {
      fetch(URL + '/city?province=' + this.state.selectedOriginProvince.province_id, {
        method: 'GET',
        headers: {
          'key': KEY
        }
      }).then((response) => response.json()).then((responseData) => {
        console.log(responseData);
        let status = responseData['rajaongkir']['status']['code'];
        if (status == 200) {
          this.setState({originCities: responseData['rajaongkir']['results']
          })
        }
      });
    });
  }

  onDestinationProvinceChange = (val) => {
    console.log(val);
    this.setState({
      selectedDestinationProvince: val
    }, () => {
      fetch(URL + '/city?province=' + this.state.selectedDestinationProvince.province_id, {
        method: 'GET',
        headers: {
          'key': KEY
        }
      }).then((response) => response.json()).then((responseData) => {
        console.log(responseData);
        let status = responseData['rajaongkir']['status']['code'];
        if (status == 200) {
          this.setState({destinationCities: responseData['rajaongkir']['results']
          })
        }
      });
    });
  }

  onOriginCityChange = (val) => {
    console.log(val);
    this.setState({selectedOriginCity: val})
  }

  onDestinationCityChange = (val) => {
    console.log(val);
    this.setState({selectedDestinationCity: val})
  }

  onNavigateToDetail = () =>{
    let params = {
      originCity : this.state.selectedOriginCity.city_id,
      destinationCity: this.state.selectedDestinationCity.city_id,
      weight: this.state.weight,
      courier: this.state.courier,
      originCityName: this.state.selectedOriginCity.city_name,
      destinationCityName: this.state.selectedDestinationCity.city_name
    };
    Actions.detail({data:params});
  }

  render() {
    let provinceItems = <View></View>;
    let provinceItemsDestination = <View></View>;
    let originCityItems = <View></View>;
    let destinationCityItems = <View></View>;

    if (this.state.provinces) {
      provinceItems = this
        .state
        .provinces
        .map(prov => {
          return (<Picker.Item
            key={prov.province_id + 'originProv'}
            label={prov.province}
            value={prov}/>);
        })
    }

    if (this.state.provinces) {
      provinceItemsDestination = this
        .state
        .provinces
        .map(prov => {
          return (<Picker.Item
            key={prov.province_id + 'destProv'}
            label={prov.province}
            value={prov}/>);
        })
    }

    if (this.state.originCities) {
      originCityItems = this
        .state
        .originCities
        .map(city => {
          return (<Picker.Item
            key={city.city_id + 'originCity'}
            label={city.city_name}
            value={city}/>);
        });
    }

    if (this.state.destinationCities) {
      destinationCityItems = this
        .state
        .destinationCities
        .map(city => {
          return (<Picker.Item
            key={city.city_id + 'destCity'}
            label={city.city_name}
            value={city}/>);
        });
    }

    return (
      <Container style={{backgroundColor:'#bab7b7'}}>
        <Header style={{
          backgroundColor: '#900C3F'
        }}>
          <Left/>
          <Body style={{flex:4, alignItems:'center'}}>
            <Title style={{
              color: 'white'
            }}>OngkirApp</Title>
            <Subtitle style={{
              color: 'white'
            }}>Input Data</Subtitle>
          </Body>
          <Right/>
        </Header>
        <Content padder>
          <Card style={{backgroundColor:'#DAF7A6'}}>
            <CardItem header>
              <Text>Alamat Asal</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{
                    width: undefined
                  }}
                    placeholder="Pilih Provinsi"
                    placeholderStyle={{
                    color: "#FF5733"
                  }}
                    selectedValue={this.state.selectedOriginProvince}
                    onValueChange={this.onOriginProvinceChange}>
                    {provinceItems}
                  </Picker>
                </Item>
                <Item picker style={{
                  marginTop: 15
                }}>
                  <Picker
                    mode="dropdown"
                    style={{
                    width: undefined
                  }}
                    placeholder="Pilih Kota"
                    placeholderStyle={{
                    color: "#FF5733"
                  }}
                    selectedValue={this.state.selectedOriginCity}
                    onValueChange={this.onOriginCityChange}>
                    {originCityItems}
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered={false}>
              <Body>
                <View><Text style={{fontWeight:'500'}}>Alamat Tujuan</Text></View>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{
                    width: undefined
                  }}
                    placeholder="Pilih Provinsi"
                    placeholderStyle={{
                    color: "#FF5733"
                  }}
                    selectedValue={this.state.selectedDestinationProvince}
                    onValueChange={this.onDestinationProvinceChange}>
                    {provinceItemsDestination}
                  </Picker>
                </Item>
                <Item picker style={{
                  marginTop: 15
                }}>
                  <Picker
                    mode="dropdown"
                    style={{
                    width: undefined
                  }}
                    placeholder="Pilih Kota"
                    placeholderStyle={{
                    color: "#FF5733"
                  }}
                    selectedValue={this.state.selectedDestinationCity}
                    onValueChange={this.onDestinationCityChange}>
                    {destinationCityItems}
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Berat Paket</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item floatingLabel>
                  <Label style={{color:'#FF5733'}}>Grams</Label>
                  <Input onChangeText={(val)=>this.setState({weight:val})} keyboardType='numeric' maxLength={6}/>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Kurir</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Pilih Kurir"
                placeholderStyle={{ color: "#FF5733" }}
                selectedValue={this.state.courier}
                onValueChange={(val)=>this.setState({courier:val})}
              >
                <Picker.Item label="JNE" value="jne" />
                <Picker.Item label="Tiki" value="tiki" />
                <Picker.Item label="Pos Indonesia" value="pos" />
              </Picker>
            </Item>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <View
          style={{
          justifyContent: 'flex-end',
          marginBottom: 20
        }}>
          <Button
            style={{
            margin: 10,
            backgroundColor: '#900C3F'
          }}
            block
            onPress={this.onNavigateToDetail}>
            <Text
              style={{
              color: '#fff',
              fontWeight: '500'
            }}>Cek Ongkir</Text>
          </Button>
        </View>
      </Container>
    )
  }
}
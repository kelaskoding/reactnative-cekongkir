import React, {PureComponent} from 'react';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Subtitle,
    Left,
    Button,
    Icon,
    Right,
    List,
    ListItem,
    Thumbnail,
    Text,
    View
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {KEY, URL, LOGO} from '../components/Const';
import NumberFormat from 'react-number-format';

export default class Detail extends PureComponent {

    constructor() {
        super();
        this.state = {
            onProcess: false,
            results: []
        }
    }

    componentDidMount() {
        console.log('DIDMOUNT');
        console.log(this.props.data);
        this.setState({onProcess: true});
        let params = this.props.data;
        const formData = new URLSearchParams();
        formData.append('origin', params.originCity);
        formData.append('destination', params.destinationCity);
        formData.append('weight', params.weight);
        formData.append('courier', params.courier);

        fetch(URL + '/cost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'key': KEY
            },
            body: formData.toString()
        }).then((response) => response.json()).then((responseData) => {
            let status = responseData['rajaongkir']['status']['code'];
            if (status === 200) {
                this.setState({
                    results: responseData['rajaongkir']['results'][0]['costs'],
                    onProcess: false
                });
                console.log(this.state.results);
            }
            {
                this.setState({onProcess: false});
            }
        })
    }

    render() {
        let costItem = <View></View>;
        if (this.state.results) {
            costItem = this
                .state
                .results
                .map(item => {
                    return (
                        <ListItem thumbnail key={new Date().getMilliseconds() + Math.random()}>
                            <Left>
                                <Thumbnail
                                    source={{
                                    uri: LOGO[this.props.data.courier]
                                }}/>
                            </Left>
                            <Body>
                                <Text>{item.service}</Text>
                                <Text note>{item.description}</Text>
                                <Text>{item.cost[0].etd}</Text>
                            </Body>
                            <Right>
                                    <NumberFormat
                                        value={item.cost[0].value}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'Rp. '} 
                                        renderText={value => <Text>{value}</Text>}/>
                            </Right>
                        </ListItem>
                    );
                });
        }
        return (
            <Container>
                <Header
                    style={{
                    backgroundColor: '#900C3F',
                }}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon 
                                style={{
                                color: 'white'
                            }}
                                name='chevron-small-left' type='Entypo'/>
                        </Button>
                    </Left>
                    <Body style={{flex:4, alignItems:'center'}}>
                        <Title
                            style={{
                            color: 'white'
                        }}>Result For</Title>
                        <Subtitle
                            style={{
                            color: 'white'
                        }}>{this.props.data.originCityName} -> {this.props.data.destinationCityName}</Subtitle>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <List>
                        {costItem}
                    </List>
                </Content>
            </Container>
        )
    }
}
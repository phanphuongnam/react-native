import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, View,TouchableOpacity,Dimensions,Image,ScrollView,AsyncStorage,Alert } from 'react-native'
import {CustomHeader} from './index'
var { width } = Dimensions.get("window")
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart:[],
    };
  }
  componentDidMount()
  {
    AsyncStorage.getItem('cart').then((cart)=>{
      console.log(cart)
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart)
        this.setState({dataCart:cartfood})
       
      }
    })
    .catch((err)=>{
      // alert(err)
    })
  }
  submit_order(){
    this.state.dataCart.map((item,index)=>{
      console.log(item.productName)
      
    })
  }
  confirm_del= ()=>{
      
    Alert.alert("Thông báo!", "Bạn có muốn xóa toàn bộ giỏ hàng không?",
        [
          
          {text:'Cancel'},
          { text:'OK', onPress:this.del_cart
          
          }
        ],
          {cancelable: false},)
  }
  del_cart= ()=> {
    
      AsyncStorage.removeItem('cart')
      this.setState({
        dataCart:''
      })

    
    
  
  }

    render() {
        return ( 
            <View style={{ flex: 1, }}>
            <CustomHeader title="Cart" isHome={false} navigation={this.props.navigation} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}>
            <View style={{marginLeft:10,marginTop:10}}>
                <TouchableOpacity style={this.state.dataCart=='' ? {display:"none"} :
                {}}
                 onPress={()=>this.confirm_del()}>
                <Text style={{fontSize:16,color:'red'}}><FontAwesome5 name={'trash-alt'} size={25}></FontAwesome5></Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
             
              {this.state.dataCart=='' || this.state.dataCart==null ? <Text style={{fontWeight:'bold',fontSize:18}}>Giỏ hàng trống</Text> :
              this.state.dataCart.map((item,i)=>{
                // this.setState({
                //   quantity:item.quantity
                // })
                return(

                  <View style={{flex:1}}>
                     
                  <View style={{width:width-20,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc",
                  paddingBottom:10}}>
                    <Image resizeMode={"contain"} style={{width:width/3,height:width/4}} source={{uri: item.image}} />
                    <View style={{flex:1, backgroundColor:'transparent', padding:10, justifyContent:"space-between"}}>
                      <View>
                        <Text style={{fontWeight:"bold", fontSize:20}}>{item.productName}</Text>
                          
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        
                        <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>${item.price*item.quantity}</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <TouchableOpacity onPress={()=>this.onChangeQual(i,false)}>
                            <Icon name="ios-remove-circle" size={30} color={"#9fd236"} />
                          </TouchableOpacity>
                          <Text style={{paddingHorizontal:8, fontWeight:'bold'}}>{item.quantity}</Text>
                          <TouchableOpacity onPress={()=>this.onChangeQual(i,true)}>
                            <Icon name="ios-add-circle" size={30} color={"#9fd236"} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                )
              })
              
            }

              <View style={{height:20}} />
                <TouchableOpacity onPress={()=>this.submit_order()} style={this.state.dataCart=='' ? {display:"none"} :
                  {
                    backgroundColor:"#9fd236",
                    width:width-40,
                    alignItems:'center',
                    padding:10,
                    borderRadius:5
                  }}>
                  <Text style={{
                      fontSize:24,
                      fontWeight:"bold",
                      color:'white'
                    }}>
                    CHECKOUT
                  </Text>
                </TouchableOpacity>

              <View style={{height:20}} />
          </View>
          </ScrollView>
          </View>
        )
    }
        onChangeQual(i,type)
      {
        const dataCar = this.state.dataCart
        let cantd = dataCar[i].quantity;

        if (type) {
        
          if(dataCar[i].quantity>=10){
            Alert.alert("Thông báo!", "Giới hạn đặt hàng tối đa cho mỗi sản phẩm là 10")
          }
          else{
            cantd = cantd + 1
            dataCar[i].quantity = cantd
          }
          this.setState({dataCart:dataCar})
          AsyncStorage.setItem('cart',JSON.stringify(dataCar));
        }
        else if (type==false&&cantd>=2){
          cantd = cantd - 1
          dataCar[i].quantity = cantd
          this.setState({dataCart:dataCar})
        }
        else if (type==false&&cantd==1){
          dataCar.splice(i,1)
          console.log(this.state.dataCart)
          this.setState({dataCart:dataCar})
          AsyncStorage.setItem('cart',JSON.stringify(this.state.dataCart))
        } 
      }
}


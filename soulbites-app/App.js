import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Button, FlatList, Image, ImageBackground, ScrollView, SectionList, SafeAreaView, Switch } from 'react-native';
import styles from './styles';

const App = () => {
  const [page, setPage] = useState('gettingStarted');
  const [userDetails, setUserDetails] = useState({});
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', email: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleSignUpChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleLoginChange = (name, value) => {
    setLoginForm({ ...loginForm, [name]: value });
  };

  const signUp = () => {
    const { username, password, confirmPassword, email } = form;

    if (!username) {
      Alert.alert('Error', 'Username is required');
      return;
    }
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Password and confirm password are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setUserDetails({ username, password, email });
    setForm({ username: '', password: '', confirmPassword: '', email: '' });
    setPage('login');
  };

  const login = () => {
    const { username, password } = loginForm;

    if (!username) {
      Alert.alert('Error', 'Username is required');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Password is required');
      return;
    }

    if (username === userDetails.username && password === userDetails.password) {
      setPage('welcome');
      Alert.alert('Logged in successfully!');
    } else {
      Alert.alert('Invalid username or password');
    }
  };

  const logout = () => {
    setPage('gettingStarted');
    setLoginForm({ username: '', password: '' });
  };

  const previousPage = () => {
    setPage('welcome');
  };

  const Data = [
    {
      id: '1',
      title: 'Cheesecake',
      description: 'A classic creamy dessert with a graham cracker crust.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjydZjutjGggeqNOJaIbT27gxZNM4Cu4jR0g&s',
      price: '250',
    },
    {
      id: '2',
      title: 'Chocolate Lava Cake',
      description: 'Warm, gooey chocolate cake filled with molten chocolate.',
      image: 'https://preppykitchen.com/wp-content/uploads/2022/03/Chocolate-Lava-Cake-Recipe.jpg',
      price: '100',
    },
    {
      id: '3',
      title: 'Red velvet cakes',
      description: 'Italian dessert made with ladyfingers, mascarpone, and espresso.',
      image: 'https://www.julieseatsandtreats.com/wp-content/uploads/2019/11/Tiramisu-Recipe-2-of-2.jpg',
      price: '120',
    },
    {
      id: '4',
      title: 'Black Forest Pastry',
      description: 'Warm, gooey chocolate cake filled with molten chocolate.',
      image: 'https://www.ruchiskitchen.com/wp-content/uploads/2021/05/Eggless-Black-forest-Pastry-recipe-1-500x500.jpg',
      price: '100',
    },
    {
      id: '5',
      title: 'Blueberry Pastry',
      description: 'Rich, velvety, and luscious cheese cake with the Blueberries on top.',
      image: 'https://www.elloras.in/cdn/shop/products/Blueberry-Cheesecake_1.jpg?v=1659334029',
      price: '100',
    },
    {
      id: '6',
      title: 'Mango pastry',
      description: 'Italian dessert made with ladyfingers, mascarpone, and espresso.',
      image: 'https://www.shutterstock.com/image-photo/piece-mango-cake-isolated-white-260nw-1053048977.jpg',
      price: '120',
    },
  ];

  const sections = [
    { title: 'cakes', data: ['cheesecake', 'chocolate lava cake', 'red velvet cake'] },
    { title: 'pastries', data: ['Black Forest', 'Blueberry', 'Mango pastry'] },
  ];

  const renderData = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
    </View>
  );

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      {page === 'gettingStarted' && (
        <View style={styles.page}>
          <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/0a/49/37/0a493772297c74e47d69da7dc6d1fb32.jpg' }} style={styles.imageBackground}>
            <Text style={styles.title}>SOUL BITES</Text>
            <Button title="Get Started" onPress={() => setPage('signUp')} />
          </ImageBackground>
        </View>
      )}

      {page === 'signUp' && (
        <View style={styles.page}>
          <ImageBackground source={{ uri: 'https://i.pinimg.com/474x/12/c2/1e/12c21ed270afd4467a7f6047698cd93a.jpg' }} style={styles.imageBackground}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={form.username}
              onChangeText={(value) => handleSignUpChange('username', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={form.password}
              onChangeText={(value) => handleSignUpChange('password', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={(value) => handleSignUpChange('confirmPassword', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={(value) => handleSignUpChange('email', value)}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={signUp}>
              <Text style={styles.buttonText}>Register yourself!</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}

      {page === 'login' && (
        <View style={styles.page}>
          <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/49/d8/9c/49d89ccbbfef5619936121f00c6b21ba.jpg' }} style={styles.imageBackground}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={loginForm.username}
              onChangeText={(value) => handleLoginChange('username', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={loginForm.password}
              onChangeText={(value) => handleLoginChange('password', value)}
            />
            <Button title="Login" onPress={login} />
          </ImageBackground>
        </View>
      )}

      {page === 'welcome' && (
        <View style={styles.page}>
          <ImageBackground source={{ uri: 'https://png.pngtree.com/background/20211217/original/pngtree-rabbit-and-cake-blue-lovely-wallpaper-background-picture-image_1598674.jpg' }} style={styles.imageBackground}>
            <Text style={styles.text}>Welcome, {userDetails.username}!</Text>
            <Text style={styles.welcomeText}>Welcome to the app!</Text>
            <Button title="Go to Product Page" onPress={() => setPage('product')} style={styles.buttonSpacing} />
            <View style={styles.buttonSpacing} />
            <Button title="Section List" onPress={() => setPage('lists')} style={styles.buttonSpacing} />
          </ImageBackground>
        </View>
      )}

      {page === 'product' && (
        <View style={styles.page}>
          <ImageBackground source={{ uri: 'https://img.freepik.com/free-vector/watercolor-chocolate-pattern-design_23-2149671650.jpg' }} style={styles.imageBackground}>
            <Text style={styles.text}>Products for {userDetails.username}</Text>
            <FlatList
              data={Data}
              renderItem={renderData}
              keyExtractor={(item) => item.id}
              horizontal={false}
              numColumns={1}
            />
            <Button title="GoBack" onPress={previousPage} />
          </ImageBackground>
        </View>
      )}

      {page === 'lists' && (
        <View style={styles.page}>
          <ImageBackground source={{ uri: 'https://marketplace.canva.com/EAGH3pOFp94/1/0/900w/canva-pink-illustration-watercolor-cake-background-instagram-story-4_MlxQPH-oo.jpg' }} style={styles.imageBackground}>
            <Text style={styles.text}>Listed Items</Text>
            <SectionList
              sections={sections}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.item}>{item}</Text>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
            <View style={styles.switch}>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <Button title="Logout" onPress={logout} />
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

export default App;

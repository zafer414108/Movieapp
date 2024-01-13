import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Logo from '../components/Logo';
import {useNavigation} from '@react-navigation/native';
import {AppScreens} from '../navigation/types';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import {useDispatch, useSelector} from 'react-redux';
import {getUpcomingState, getTopRatedState} from '../app/movieSelector';
import {GetUpcomingMovies, GetTopRatedMovies} from '../app/movieAction';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const upcomingMovies = useSelector(getUpcomingState());
  const topRatedMovies = useSelector(getTopRatedState());

  useEffect(() => {
    dispatch(GetUpcomingMovies());
    dispatch(GetTopRatedMovies());
  }, [dispatch]);

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-4">
        <StatusBar barStyle="light-content" />
        <View className="flex-row  justify-between px-4 items-center">
          <Icon name="menuunfold" size={30} color="#fff" />
          <Logo />
          <TouchableOpacity
            onPress={() => navigation.navigate(AppScreens.Search)}>
            <Icon name="search1" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView>
        {/* trending movies */}
        <TrendingMovies />
        {/* upcoming movies */}
        <MovieList title="Upcoming" data={upcomingMovies} />
        {/* top rated movies */}
        <MovieList title="Top Rated" data={topRatedMovies} />
      </ScrollView>
    </View>
  );
}

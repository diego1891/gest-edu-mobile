import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageAdapter {
  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  static async removeItem(key: string): Promise<void>{
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        throw new Error("Error eliminando item");
        
    }
  }
  
  static async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('token');
      const expiration = await AsyncStorage.getItem('token_expiration');
      if (token && expiration && new Date().getTime() < parseInt(expiration, 10)) {
        return token;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

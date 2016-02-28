import Character from '../models/character';


class CharactersDAO {
    
    getRandomCharacters(count,gender){
        return Character.find({ random: { $near: [Math.random(), 0] } })
               .where('voted', false)
               .where('gender', gender)
               .limit(count)
               .execAsync();
    }
    
    getCharacterCount(){
        return Character.countAsync({});
    }
    
    getCharacterByName(name){
        return Character.findOneAsync({ name: name });
    }
    
    getCharacterById(id){
        return Character.findOneAsync({ characterId: id });
    }
    
};

export default new CharactersDAO();
import Character from '../models/character';


class CharactersDAO {
    
    getRandomCharacters(count,gender){
        return Character.find({ random: { $near: [Math.random(), 0] } })
               .where('voted', false)
               .where('gender', gender)
               .limit(count)
               .execAsync();
    }
    
    getCharacterCount(conditions){
        return Character.find(conditions || {}).countAsync({});
    }
    
    getCharacterByName(name){
        return Character.findOneAsync({ name: name });
    }
    
    getCharacterById(id){
        return Character.findOneAsync({ characterId: id });
    }
    
    getShameCharacters(limit){
        return Character
               .find()
               .sort('-losses')
               .skip(limit.start)
               .limit(limit.count)
               .execAsync();
    }
    
    getTopCharacters(conditions,limit){
       return Character
              .find(conditions)
              .sort('-wins')
              .skip(limit.start)
              .limit(limit.count)
              .execAsync();
    }
    
    save(data){
        return new Character(data).saveAsync();
        
    }
    
};

export default new CharactersDAO();
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
    
    getTopCharacters(conditions,limit,orderBy){
       return Character
              .find(conditions)
              .sort(orderBy)
              .skip(limit.start)
              .limit(limit.count)
              .execAsync();
    }
    
    save(data){
        return new Character(data).saveAsync();
        
    }
    
};

export default new CharactersDAO();
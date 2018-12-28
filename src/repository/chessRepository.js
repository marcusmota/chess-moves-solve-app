
import axios from 'axios';
import params from './../params.json';

export const getAvailableMovesByPosition = (piece, position, turns = 2) => axios.get(params.apiUrl+'/v1/get-moves-by-position/'+piece+'?position='+position+"&turns="+turns);
export const getCouldMove = (piece, start, end) => axios.get(params.apiUrl+'/v1/could-move/'+piece+'?start='+start+"&end="+end);

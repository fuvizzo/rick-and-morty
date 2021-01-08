interface IDatabaseService {
  initDatabase: () => void
  closeConnection: () => void
}

export default IDatabaseService;

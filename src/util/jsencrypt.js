import { JSEncrypt } from 'jsencrypt'
let encrypt = new JSEncrypt();
encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzx9vlALbxRmsSMPHn1RCdbxMxOJ25zpi4n6mZXOx1d7XdtS7B77yCsgtJD29omkqlRi9QMt0v4exraJ1X+Yut/l8jAsUXLYUawPmfGCHcexs0kTiWK9yHt3jA/juqpbW1xf32P+Da4UBAyL0z1/U7x3rQL3cL4Dt1xmpi1B0e9wIDAQAB');
export default encrypt;
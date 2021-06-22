var fs = require('fs').promises
const parse = require('csv-parse/lib/sync')
const { gql } = require('@apollo/client')

export const getSeedMutations = async () => {
  const parties = await fs.readFile('src/seed/csv/parties.csv')
  const users = await fs.readFile('src/seed/csv/users.csv')
  const objects = await fs.readFile('src/seed/csv/objects.csv')
  const records = {
    parties: parse(parties, { columns: true }),
    users: parse(users, { columns: true }),
    objects: parse(objects, { columns: true }),
  }
  const mutations = generateMutations(records)
  return mutations
}

const generateMutations = (records) => {
  // for each parties record, createParty(information)
  // for each user record, createUser(info, parties: {connect: {where: {id_IN: partyids}}})
  // for each object record, createObject(info, party: {connect: {where: {id_IN: partyid}}}, owner: {connect: {where: {id_IN: userid}}})

  let partyMutations = records.parties.map((rec) => {
    Object.keys(rec).map((k) => {
      if (k === 'id' || k === 'host') rec[k] = parseInt(rec[k])
      else if (k === 'invitees') rec[k] = rec[k].split(',').map(parseInt)
    })

    return {
      mutation: gql`
        mutation createParty {

        }
      `,
      variables: rec,
    }
  })

  return [].concat(partyMutations)
}

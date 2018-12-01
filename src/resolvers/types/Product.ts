import { prismaObjectType } from '../../../plugin'
import * as ProductVariant from '../../fragments'
import { optionsFromVariants } from '../utils'
import { intArg, arg } from 'gqliteral'
import { AttributeWhereInput } from '../../generated/prisma-client'

export const Product = prismaObjectType('Product', t => {
  t.prisma = {
    typeName: 'Product',
    fields: {}
  }

  t.prismaFields({filter: fields => fields.filter()})
  t.prismaFields({pick: ['']})
  t.prismaFields({omit: ['']})

  t.prismaFields([
    {
      name: 'attributes',
      args: ['first'],
    },
  ])

  t.field('options', 'Option', {
    list: true,
    resolve: async (parent, args, ctx) => {
      const { variants } = await ctx.prisma
        .product({ id: parent.id })
        .$fragment<ProductVariant.Type>(ProductVariant.fragment)

      return optionsFromVariants(variants)
    },
  })

  t.field('myAttributes', 'Attribute', {
    list: true,
    args: t.prisma.attributes.args,
      // where: arg('AttributeWhereInput'),
    // },
    // resolve: t.prisma.fields['attributes'].resolve,
    resolve: (parent, args, ctx) => {
      const newArgs: { where: AttributeWhereInput } = {
        where: { ...args, id_contains: 'sdfs' },
      }
      // args.where = {id_contains: 'sfdds'}
      return t.prisma.fields['attributes'].resolve(newArgs)
      // return ctx.prisma.product({ id: parent.id }).attributes(newArgs)
    },
  })
})

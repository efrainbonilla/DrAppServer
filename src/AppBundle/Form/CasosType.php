<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CasosType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('caseTitle')
            ->add('caseContent')
            /*->add('caseCreatedAt')
            ->add('caseUpdateAt')*/
            ->add('caseStatus')
            ->add('commentStatus')
            ->add('accessControl')
            /*->add('caseUser', 'entity', array(
                'class' => 'UserBundle:User',
                'property' => 'id'
            ))*/
            ->add('caseClin', 'entity', array(
                'class' => 'AppBundle:Clinicas',
                'property' => 'clinId'
            ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Casos',
            'csrf_protection' => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'casos';
    }
}

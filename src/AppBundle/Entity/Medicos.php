<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Medicos
 *
 * @ORM\Table(name="medicos", indexes={@ORM\Index(name="md_user_id", columns={"md_user_id"})})
 * @ORM\Entity
 */
class Medicos
{
    /**
     * @var integer
     *
     * @ORM\Column(name="md_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mdId;

    /**
     * @var string
     *
     * @ORM\Column(name="md_firstname", type="string", length=100, nullable=false)
     */
    private $mdFirstname;

    /**
     * @var string
     *
     * @ORM\Column(name="md_lastname", type="string", length=100, nullable=false)
     */
    private $mdLastname;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="md_date_of_birth", type="date", nullable=false)
     */
    private $mdDateOfBirth;

    /**
     * @var string
     *
     * @ORM\Column(name="md_gender", type="string", length=1, nullable=false)
     */
    private $mdGender;

    /**
     * @var string
     *
     * @ORM\Column(name="md_num_telf", type="string", length=20, nullable=false)
     */
    private $mdNumTelf;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="md_user_id", referencedColumnName="user_id")
     * })
     */
    private $mdUser;



    /**
     * Get mdId
     *
     * @return integer 
     */
    public function getMdId()
    {
        return $this->mdId;
    }

    /**
     * Set mdFirstname
     *
     * @param string $mdFirstname
     * @return Medicos
     */
    public function setMdFirstname($mdFirstname)
    {
        $this->mdFirstname = $mdFirstname;

        return $this;
    }

    /**
     * Get mdFirstname
     *
     * @return string 
     */
    public function getMdFirstname()
    {
        return $this->mdFirstname;
    }

    /**
     * Set mdLastname
     *
     * @param string $mdLastname
     * @return Medicos
     */
    public function setMdLastname($mdLastname)
    {
        $this->mdLastname = $mdLastname;

        return $this;
    }

    /**
     * Get mdLastname
     *
     * @return string 
     */
    public function getMdLastname()
    {
        return $this->mdLastname;
    }

    /**
     * Set mdDateOfBirth
     *
     * @param \DateTime $mdDateOfBirth
     * @return Medicos
     */
    public function setMdDateOfBirth($mdDateOfBirth)
    {
        $this->mdDateOfBirth = $mdDateOfBirth;

        return $this;
    }

    /**
     * Get mdDateOfBirth
     *
     * @return \DateTime 
     */
    public function getMdDateOfBirth()
    {
        return $this->mdDateOfBirth;
    }

    /**
     * Set mdGender
     *
     * @param string $mdGender
     * @return Medicos
     */
    public function setMdGender($mdGender)
    {
        $this->mdGender = $mdGender;

        return $this;
    }

    /**
     * Get mdGender
     *
     * @return string 
     */
    public function getMdGender()
    {
        return $this->mdGender;
    }

    /**
     * Set mdNumTelf
     *
     * @param string $mdNumTelf
     * @return Medicos
     */
    public function setMdNumTelf($mdNumTelf)
    {
        $this->mdNumTelf = $mdNumTelf;

        return $this;
    }

    /**
     * Get mdNumTelf
     *
     * @return string 
     */
    public function getMdNumTelf()
    {
        return $this->mdNumTelf;
    }

    /**
     * Set mdUser
     *
     * @param \AppBundle\Entity\User $mdUser
     * @return Medicos
     */
    public function setMdUser(\AppBundle\Entity\User $mdUser = null)
    {
        $this->mdUser = $mdUser;

        return $this;
    }

    /**
     * Get mdUser
     *
     * @return \AppBundle\Entity\User 
     */
    public function getMdUser()
    {
        return $this->mdUser;
    }
}

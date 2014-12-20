<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Pacientes
 *
 * @ORM\Table(name="pacientes")
 * @ORM\Entity
 */
class Pacientes
{
    /**
     * @var integer
     *
     * @ORM\Column(name="pat_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $patId;

    /**
     * @var string
     *
     * @ORM\Column(name="pat_firstname", type="string", length=100, nullable=false)
     */
    private $patFirstname;

    /**
     * @var string
     *
     * @ORM\Column(name="pat_lastname", type="string", length=100, nullable=false)
     */
    private $patLastname;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="pat_date_of_birth", type="date", nullable=false)
     */
    private $patDateOfBirth;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="pat_created_at", type="datetime", nullable=false)
     */
    private $patCreatedAt;



    /**
     * Get patId
     *
     * @return integer 
     */
    public function getPatId()
    {
        return $this->patId;
    }

    /**
     * Set patFirstname
     *
     * @param string $patFirstname
     * @return Pacientes
     */
    public function setPatFirstname($patFirstname)
    {
        $this->patFirstname = $patFirstname;

        return $this;
    }

    /**
     * Get patFirstname
     *
     * @return string 
     */
    public function getPatFirstname()
    {
        return $this->patFirstname;
    }

    /**
     * Set patLastname
     *
     * @param string $patLastname
     * @return Pacientes
     */
    public function setPatLastname($patLastname)
    {
        $this->patLastname = $patLastname;

        return $this;
    }

    /**
     * Get patLastname
     *
     * @return string 
     */
    public function getPatLastname()
    {
        return $this->patLastname;
    }

    /**
     * Set patDateOfBirth
     *
     * @param \DateTime $patDateOfBirth
     * @return Pacientes
     */
    public function setPatDateOfBirth($patDateOfBirth)
    {
        $this->patDateOfBirth = $patDateOfBirth;

        return $this;
    }

    /**
     * Get patDateOfBirth
     *
     * @return \DateTime 
     */
    public function getPatDateOfBirth()
    {
        return $this->patDateOfBirth;
    }

    /**
     * Set patCreatedAt
     *
     * @param \DateTime $patCreatedAt
     * @return Pacientes
     */
    public function setPatCreatedAt($patCreatedAt)
    {
        $this->patCreatedAt = $patCreatedAt;

        return $this;
    }

    /**
     * Get patCreatedAt
     *
     * @return \DateTime 
     */
    public function getPatCreatedAt()
    {
        return $this->patCreatedAt;
    }
}

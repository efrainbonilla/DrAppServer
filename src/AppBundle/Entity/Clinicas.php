<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Clinicas
 *
 * @ORM\Table(name="clinicas")
 * @ORM\Entity
 */
class Clinicas
{
    /**
     * @var integer
     *
     * @ORM\Column(name="clin_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $clinId;

    /**
     * @var string
     *
     * @ORM\Column(name="clin_name", type="string", length=255, nullable=false)
     * @Assert\NotBlank()
     */
    private $clinName;

    /**
     * @var string
     *
     * @ORM\Column(name="clin_lat", type="string", length=50, nullable=false)
     */
    private $clinLat;

    /**
     * @var string
     *
     * @ORM\Column(name="clin_lng", type="string", length=50, nullable=false)
     */
    private $clinLng;

    /**
     * @var string
     *
     * @ORM\Column(name="clin_addr", type="string", nullable=false)
     * @Assert\NotBlank()
     */
    private $clinAddr;


    /**
     * Get clinId
     *
     * @return integer 
     */
    public function getClinId()
    {
        return $this->clinId;
    }

    /**
     * Set clinName
     *
     * @param string $clinName
     * @return Clinicas
     */
    public function setClinName($clinName)
    {
        $this->clinName = $clinName;

        return $this;
    }

    /**
     * Get clinName
     *
     * @return string 
     */
    public function getClinName()
    {
        return $this->clinName;
    }

    /**
     * Set clinLat
     *
     * @param string $clinLat
     * @return Clinicas
     */
    public function setClinLat($clinLat)
    {
        $this->clinLat = $clinLat;

        return $this;
    }

    /**
     * Get clinLat
     *
     * @return string 
     */
    public function getClinLat()
    {
        return $this->clinLat;
    }

    /**
     * Set clinLng
     *
     * @param string $clinLng
     * @return Clinicas
     */
    public function setClinLng($clinLng)
    {
        $this->clinLng = $clinLng;

        return $this;
    }

    /**
     * Get clinLng
     *
     * @return string 
     */
    public function getClinLng()
    {
        return $this->clinLng;
    }

    /**
     * Set clinAddr
     *
     * @param string $clinAddr
     * @return Clinicas
     */
    public function setClinAddr($clinAddr)
    {
        $this->clinAddr = $clinAddr;

        return $this;
    }

    /**
     * Get clinAddr
     *
     * @return string 
     */
    public function getClinAddr()
    {
        return $this->clinAddr;
    }
}

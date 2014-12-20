<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Resultados
 *
 * @ORM\Table(name="resultados", indexes={@ORM\Index(name="result_case_id", columns={"result_case_id"})})
 * @ORM\Entity
 */
class Resultados
{
    /**
     * @var integer
     *
     * @ORM\Column(name="result_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $resultId;

    /**
     * @var string
     *
     * @ORM\Column(name="result_status", type="string", length=20, nullable=false)
     */
    private $resultStatus;

    /**
     * @var string
     *
     * @ORM\Column(name="result_title", type="text", nullable=false)
     */
    private $resultTitle;

    /**
     * @var string
     *
     * @ORM\Column(name="result_content", type="text", nullable=false)
     */
    private $resultContent;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="result_created_at", type="datetime", nullable=false)
     */
    private $resultCreatedAt;

    /**
     * @var \Casos
     *
     * @ORM\ManyToOne(targetEntity="Casos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="result_case_id", referencedColumnName="case_id")
     * })
     */
    private $resultCase;



    /**
     * Get resultId
     *
     * @return integer 
     */
    public function getResultId()
    {
        return $this->resultId;
    }

    /**
     * Set resultStatus
     *
     * @param string $resultStatus
     * @return Resultados
     */
    public function setResultStatus($resultStatus)
    {
        $this->resultStatus = $resultStatus;

        return $this;
    }

    /**
     * Get resultStatus
     *
     * @return string 
     */
    public function getResultStatus()
    {
        return $this->resultStatus;
    }

    /**
     * Set resultTitle
     *
     * @param string $resultTitle
     * @return Resultados
     */
    public function setResultTitle($resultTitle)
    {
        $this->resultTitle = $resultTitle;

        return $this;
    }

    /**
     * Get resultTitle
     *
     * @return string 
     */
    public function getResultTitle()
    {
        return $this->resultTitle;
    }

    /**
     * Set resultContent
     *
     * @param string $resultContent
     * @return Resultados
     */
    public function setResultContent($resultContent)
    {
        $this->resultContent = $resultContent;

        return $this;
    }

    /**
     * Get resultContent
     *
     * @return string 
     */
    public function getResultContent()
    {
        return $this->resultContent;
    }

    /**
     * Set resultCreatedAt
     *
     * @param \DateTime $resultCreatedAt
     * @return Resultados
     */
    public function setResultCreatedAt($resultCreatedAt)
    {
        $this->resultCreatedAt = $resultCreatedAt;

        return $this;
    }

    /**
     * Get resultCreatedAt
     *
     * @return \DateTime 
     */
    public function getResultCreatedAt()
    {
        return $this->resultCreatedAt;
    }

    /**
     * Set resultCase
     *
     * @param \AppBundle\Entity\Casos $resultCase
     * @return Resultados
     */
    public function setResultCase(\AppBundle\Entity\Casos $resultCase = null)
    {
        $this->resultCase = $resultCase;

        return $this;
    }

    /**
     * Get resultCase
     *
     * @return \AppBundle\Entity\Casos 
     */
    public function getResultCase()
    {
        return $this->resultCase;
    }
}
